export enum RetCodeEnum {

    //服务器维护中
    serverRepair = -10,

    //正常结果
    success = 0,

    //程序内部错误
    serverError = 1,

    //未认证的请求
    authenticationFailure = 2,

    //未授权的请求
    authorizationFailure = 3,

    //代理相关错误
    agentError = 4

}

export enum ErrCodeEnum {

    //正常结果
    success = 0,

    //自动捕捉的错误
    autoSnapError = 1,

    //应用程序错误
    applicationError = 2,

    //授权错误
    authorizationError = 3,

    //参数相关的错误
    argumentError = 4,

    //API调用错误
    apiInvokingError = 5,

    //程序逻辑校验失败错误
    logicError = 6,

    //网络连接异常错误
    networkError = 7,

    //应用程序路由不匹配错误(非网关层面)
    applicationRouterMatchError = 8,

    // db相关错误
    databaseConnectionError = 9,

    //身份认证失败
    authenticationError = 30,

    //网关HTTP组件调用错误
    gatewayHttpComponentInvokingError = 31,

    //网关路由匹配错误
    gatewayRouterMatchError = 32,

    //网关上游API调用错误
    gatewayUpstreamApiError = 33,

    //异常占位区
    apiError = 100,
}

export enum IdentityTypeEnum {

    /**
     * 未登陆用户
     */
    UnLoginUser = 1,

    /**
     * 已登陆用户
     */
    LoginUser = 2,

    /**
     * 内部客户端
     */
    InternalClient = 4,

    /**
     * 登陆用户并且具备client身份
     */
    LoginUserAndInternalClient = 8,

    /**
     * 未登陆用户,但是具备client身份
     */
    UnLoginUserAndInternalClient = 16,
}

export enum ResourceTypeEnum {

    /**
     * 图片资源
     */
    IMAGE = "image",

    /**
     * 音频资源
     */
    AUDIO = "audio",

    /**
     * 视频资源
     */
    VIDEO = "video",

    /**
     * markdown资源
     */
    MARKDOWN = "markdown",

    /**
     * 组合资源
     */
    THEME = "theme",

    /**
     * 滑块
     */
    REVEAL_SLIDE = "reveal_slide",

    /**
     * 插件
     */
    WIDGET = "widget",

    /**
     * 协议
     */
    LICENSE = "license"

}
