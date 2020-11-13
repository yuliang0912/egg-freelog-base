import { FreelogContext, IRestfulWebApi, ApplicationErrorBase } from '../../index';
declare const _default: {
    /**
     * 响应成功的消息
     * @param data
     */
    success(this: FreelogContext, data: any): FreelogContext;
    /**
     * 错误响应
     * @param errorInfo
     */
    error(this: FreelogContext, errorInfo: ApplicationErrorBase | Error | string | undefined): void;
    /**
     * 是否是登录用户
     */
    isLoginUser(this: FreelogContext): boolean;
    /**
     * 是否是内网请求
     */
    isInternalClient(this: FreelogContext): boolean;
    /**
     * 实体空值校验
     * @param entity
     * @param msg
     * @param data
     */
    entityNullObjectCheck(this: FreelogContext, entity: object | null, msg?: string | undefined, data?: any): FreelogContext;
    /**
     * 用户身份ID与实体的用户属性之间是否匹配校验
     * @param entity
     * @param property
     * @param targetId
     */
    entityUserAuthorization(this: FreelogContext, entity: object | null, property?: string, targetId?: number | undefined): FreelogContext;
    /**
     * 内部服务restful-url前缀部分
     */
    readonly webApi: IRestfulWebApi;
    /**
     * 修复中括号无法被正确的编码错误
     * @param str
     */
    fixedEncodeURI(str: string): string;
    /**
     * 内部curl请求,用户跨服务api调用
     * @param url
     * @param options
     */
    curlIntranetApi(this: FreelogContext, url: string, options?: object | undefined): Promise<any>;
};
export default _default;
