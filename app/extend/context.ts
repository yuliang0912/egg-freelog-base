import {parse} from 'url';
import {isError, isNullOrUndefined, isObject, isString} from 'util';
import {base64Encode, hmacSha1} from '../../lib/crypto-helper';
import {buildApiFormatData, convertIntranetApiResponseData} from '../../lib/freelog-common-func';
import {
    ApiInvokingError, ApplicationError,
    ApplicationErrorBase,
    ArgumentError, AuthenticationError,
    AuthorizationError,
    AutoSnapError,
    CurlResFormatEnum,
    ErrCodeEnum,
    FreelogContext,
    IdentityTypeEnum,
    IRestfulWebApi,
    RetCodeEnum,
} from '../../index';

export default {

    /**
     * 响应成功的消息
     * @param data
     */
    success(this: FreelogContext, data: object | any[] | string | number | boolean): FreelogContext {
        this.body = buildApiFormatData(RetCodeEnum.success, ErrCodeEnum.success, 'success', data);
        return this;
    },

    /**
     * 错误响应
     * @param errorInfo
     */
    error(this: FreelogContext, errorInfo: ApplicationErrorBase | Error | string | undefined): void {

        const isErrorParam = isError(errorInfo);
        if ((this.app.config.env === 'test' || this.app.config.env === 'local') && isErrorParam) {
            console.error(errorInfo);
        }
        if (isErrorParam && errorInfo instanceof ApplicationErrorBase) {
            throw errorInfo;
        }
        if (isErrorParam) {
            throw {...(errorInfo as Error), ...{retCode: RetCodeEnum.success, errCode: ErrCodeEnum.autoSnapError}};
        }
        throw new AutoSnapError(isString(errorInfo) ? errorInfo as string : '接口内部异常');
    },

    /**
     * 验证参数
     * @return {exports}
     */
    validateParams(this: FreelogContext): FreelogContext {

        if (!this.errors.length) {
            return this;
        }
        const fields: string[] = [];
        for (const error of this.errors) {
            Object.keys(error).forEach(x => fields.push(x));
        }
        throw new ArgumentError(this.gettext('params-validate-failed', fields.toString()), this.errors);
    },

    /**
     * 是否是登录用户
     */
    isLoginUser(this: FreelogContext): boolean {
        return (this.userId ?? 0) > 0;
    },

    /**
     * 是否是内网请求
     */
    isInternalClient(this: FreelogContext): boolean {
        return (this.clientId ?? 0) > 0;
    },

    /**
     * 是否是官方后台审核账号
     */
    isOfficialAuditAccount(this: FreelogContext): boolean {
        if (!this.isLoginUser()) {
            return false;
        }
        return this.identityInfo.userInfo?.email === 'support@freelog.com';
    },

    /**
     * 是否官方审核账户
     */
    validateOfficialAuditAccount(this: FreelogContext): FreelogContext {

        if (!this.userId) {
            throw new AuthenticationError(this.gettext('user-authentication-failed'));
        }

        const {userInfo} = this.identityInfo;
        if (userInfo?.email !== 'support@freelog.com') {
            throw new AuthorizationError(this.gettext('user-authorization-failed'));
        }
        return this;
    },

    /**
     * 访客身份认证与授权
     * @param identityType
     */
    validateVisitorIdentity(this: FreelogContext, identityType = 6): FreelogContext {

        const {InternalClient, LoginUser, UnLoginUser, LoginUserAndInternalClient, UnLoginUserAndInternalClient} = IdentityTypeEnum;

        if ((identityType & InternalClient) === InternalClient && this.isInternalClient()) {
            return this;
        }
        if ((identityType & LoginUser) === LoginUser && this.isLoginUser()) {
            return this;
        }
        if ((identityType & UnLoginUser) === UnLoginUser && !this.isLoginUser()) {
            return this;
        }
        if (identityType === LoginUserAndInternalClient && this.isLoginUser() && this.isInternalClient()) {
            return this;
        }
        if (identityType === UnLoginUserAndInternalClient && !this.isLoginUser() && this.isInternalClient()) {
            return this;
        }
        if (!this.isLoginUser()) {
            throw new AuthenticationError(this.gettext('user-authentication-failed'));
        }
        throw new AuthorizationError(this.gettext('user-authorization-failed'));
    },

    /**
     * 实体空值校验
     * @param entity
     * @param options
     */
    entityNullObjectCheck(this: FreelogContext, entity: object | null, options?: { msg?: string, data?: any }): FreelogContext {
        if (isNullOrUndefined(entity) || !isObject(entity)) {
            throw new ApplicationError(isString(options?.msg) ? options?.msg as string : 'entity is null', options?.data);
        }
        return this;
    },

    /**
     * 用户身份ID与实体的用户属性之间是否匹配校验
     * @param entity
     * @param options
     */
    entityNullValueAndUserAuthorizationCheck(this: FreelogContext, entity: object | null, options?: { msg?: string, data?: any, property?: string }): FreelogContext {

        if (!this.isLoginUser()) {
            throw new AuthenticationError(this.gettext('user-authentication-failed'));
        }

        this.entityNullObjectCheck(entity, options);

        const property = options?.property ?? 'userId';

        if (entity?.[property] !== this.userId) {
            throw new AuthorizationError(this.gettext('user-authorization-failed'));
        }

        return this;
    },

    /**
     * 内部服务restful-url前缀部分
     */
    get webApi(): IRestfulWebApi {
        const that = (this as any) as FreelogContext;
        return that.app.webApi;
    },

    /**
     * 修复中括号无法被正确的编码错误
     * @param str
     */
    fixedEncodeURI(str: string): string {
        return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
    },

    /**
     * 内部curl请求,用户跨服务api调用
     * @param url
     * @param options
     */
    async curlIntranetApi(this: FreelogContext, url: string, options?: object, resFormat: CurlResFormatEnum = CurlResFormatEnum.FreelogApiData) {

        const {clientCredentialInfo} = this.app.config;
        if (!clientCredentialInfo) {
            throw new ArgumentError('未找到clientCredentialInfo配置信息');
        }

        url = this.fixedEncodeURI(url);
        const opt = Object.assign({headers: {}, dataType: 'json'}, options ?? {});

        if (resFormat !== CurlResFormatEnum.FreelogApiData) {
            delete opt.dataType;
        }

        const timeLine = Math.round(new Date().getTime() / 1000);
        const text = `${parse(url).path}&timeline=${timeLine}`;

        opt.headers['clientid'] = clientCredentialInfo.clientId;
        opt.headers['timeline'] = timeLine;
        opt.headers['sign'] = hmacSha1(text, clientCredentialInfo.privateKey);

        if (this.get('authorization')) {
            opt.headers['authorization'] = this.get('authorization');
        }
        if (Object.keys(this.identityInfo).length) {
            const token = base64Encode(JSON.stringify(this.identityInfo));
            const sign = hmacSha1(token, clientCredentialInfo.privateKey);
            opt.headers['authentication'] = `${token}:${sign}`;
        }
        // gateway分配的全局请求追踪ID
        if (isString(this.get('traceId'))) {
            opt.headers['traceId'] = this.get('traceId');
        }
        // i18n设置
        if (isString(this.get('accept-language'))) {
            opt.headers['accept-language'] = this.get('accept-language');
        }

        return this.curl(url, opt).then(response => {
            if (resFormat === CurlResFormatEnum.FreelogApiData) {
                // freelog标准返回格式为 {ret:number,errCode:number,data:any }
                return convertIntranetApiResponseData(response.data, url, options);
            } else if (resFormat === CurlResFormatEnum.OriginalData) {
                // 原始返回,但是只返回data部分
                return response.data;
            } else if (resFormat === CurlResFormatEnum.Original) {
                return response;
            } else {
                throw new ApplicationError('不能识别的resFormat');
            }
        }).catch(error => {
            throw new ApiInvokingError(error.message || error.toString(), {url, options});
        });
    },
};
