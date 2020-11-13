import {parse} from 'url';
import {isError, isObject, isString} from 'util'
import {hmacSha1, base64Encode} from '../../lib/crypto-helper';
import {buildApiFormatData, convertIntranetApiResponseData, entityNullObjectCheck} from '../../lib/freelog-common-func';
import {
    ErrCodeEnum, RetCodeEnum, FreelogContext, IRestfulWebApi, IdentityTypeEnum,
    AutoSnapError, ApplicationErrorBase, ArgumentError, ApiInvokingError, AuthorizationError,
} from '../../index';

export default {

    /**
     * 响应成功的消息
     * @param data
     */
    success(this: FreelogContext, data: any): FreelogContext {
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
        throw new AutoSnapError(isString(errorInfo) ? errorInfo as string : '接口内部异常')
    },

    /**
     * 验证参数
     * @returns {exports}
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
     * 访客身份认证与授权
     * @param identityType
     */
    validateVisitorIdentity(this: FreelogContext, identityType: number = 6): FreelogContext {

        const {InternalClient, LoginUser, UnLoginUser, LoginUserAndInternalClient, UnLoginUserAndInternalClient} = IdentityTypeEnum

        if ((identityType & InternalClient) === InternalClient && this.isInternalClient()) {
            return this
        }
        if ((identityType & LoginUser) === LoginUser && this._isLoginUser()) {
            return this
        }
        if ((identityType & UnLoginUser) === UnLoginUser && !this._isLoginUser()) {
            return this
        }
        if (identityType === LoginUserAndInternalClient && this._isLoginUser() && this._isInternalClient()) {
            return this
        }
        if (identityType === UnLoginUserAndInternalClient && !this._isLoginUser() && this._isInternalClient()) {
            return this
        }

        throw new AuthorizationError(this.gettext('user-authorization-failed'));
    },

    /**
     * 实体空值校验
     * @param entity
     * @param msg
     * @param data
     */
    entityNullObjectCheck(this: FreelogContext, entity: object | null, msg?: string, data?: any): FreelogContext {
        entityNullObjectCheck(entity, msg, data);
        return this;
    },

    /**
     * 用户身份ID与实体的用户属性之间是否匹配校验
     * @param entity
     * @param property
     * @param targetId
     */
    entityUserAuthorization(this: FreelogContext, entity: object | null, property = 'userId', targetId?: number): FreelogContext {

        this.entityNullObjectCheck(entity);
        targetId = targetId ?? this.userId;

        if (entity?.[property] !== targetId) {
            throw new AuthorizationError(this.gettext('user-authorization-failed'));
        }

        return this;
    },

    /**
     * 内部服务restful-url前缀部分
     */
    get webApi(): IRestfulWebApi {
        return (this as any).app.webApi;
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
    async curlIntranetApi(this: FreelogContext, url: string, options?: object) {

        const {clientCredentialInfo} = this.app.config;
        if (!clientCredentialInfo) {
            throw new ArgumentError('未找到clientCredentialInfo配置信息')
        }

        const opt = Object.assign({headers: {}, dataType: 'json'}, options);
        const timeLine = Math.round(new Date().getTime() / 1000);
        const text = `${parse(url).path}&timeline=${timeLine}`;

        url = this.fixedEncodeURI(url);

        opt.headers['clientid'] = clientCredentialInfo.clientId;
        opt.headers['timeline'] = timeLine;
        opt.headers['sign'] = hmacSha1(text, clientCredentialInfo.privateKey);

        if (this.get('authorization')) {
            opt.headers['authorization'] = this.get('authorization')
        }
        if (Object.keys(this.identityInfo).length) {
            const token = base64Encode(JSON.stringify(this.identityInfo));
            const sign = hmacSha1(token, clientCredentialInfo.privateKey);
            opt.headers['authentication'] = `${token}:${sign}`;
        }
        // gateway分配的全局请求追踪ID
        if (isString(this.get('traceId'))) {
            opt.headers['traceId'] = this.get('traceId')
        }
        // i18n设置
        if (isString(this.get('accept-language'))) {
            opt.headers['accept-language'] = this.get('accept-language');
        }

        return this.curl(url, opt).catch(error => {
            throw new ApiInvokingError(error.message || error.toString(), {url, options});
        }).then(response => {
            const contentType = response.res.headers['content-type'];
            if (opt.dataType === 'original') {
                return response;
            } else if (isObject(response.data)) {
                return convertIntranetApiResponseData(response.data, url, options);
            } else if (contentType && contentType.toLowerCase().includes('application/json')) {
                return convertIntranetApiResponseData(JSON.parse(response.data.toString()), url, options);
            } else {
                return response.data.toString();
            }
        });
    }

};
