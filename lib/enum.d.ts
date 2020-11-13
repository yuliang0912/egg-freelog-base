export declare enum RetCodeEnum {
    serverRepair = -10,
    success = 0,
    serverError = 1,
    authenticationFailure = 2,
    authorizationFailure = 3,
    agentError = 4
}
export declare enum ErrCodeEnum {
    success = 0,
    autoSnapError = 1,
    applicationError = 2,
    authorizationError = 3,
    argumentError = 4,
    apiInvokingError = 5,
    logicError = 6,
    networkError = 7,
    applicationRouterMatchError = 8,
    databaseConnectionError = 9,
    authenticationError = 30,
    gatewayHttpComponentInvokingError = 31,
    gatewayRouterMatchError = 32,
    gatewayUpstreamApiError = 33,
    apiError = 100
}
export declare enum IdentityTypeEnum {
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
    UnLoginUserAndInternalClient = 16
}
export declare enum ResourceTypeEnum {
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
