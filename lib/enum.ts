/**
 * 一级错误码
 */
export enum RetCodeEnum {

    // 服务器维护中
    serverRepair = -10,

    // 正常结果
    success = 0,

    // 程序内部错误
    serverError = 1,

    // 未认证的请求
    authenticationFailure = 2,

    // 未授权的请求
    authorizationFailure = 3,

    // 代理相关错误
    agentError = 4

}

/**
 * 二级错误码
 */
export enum ErrCodeEnum {

    // 正常结果
    success = 0,

    // 自动捕捉的错误
    autoSnapError = 1,

    // 应用程序错误
    applicationError = 2,

    // 授权错误
    authorizationError = 3,

    // 参数相关的错误
    argumentError = 4,

    // API调用错误
    apiInvokingError = 5,

    // 程序逻辑校验失败错误
    logicError = 6,

    // 网络连接异常错误
    networkError = 7,

    // 应用程序路由不匹配错误(非网关层面)
    applicationRouterMatchError = 8,

    // db相关错误
    databaseConnectionError = 9,

    // 身份认证失败
    authenticationError = 30,

    // 网关HTTP组件调用错误
    gatewayHttpComponentInvokingError = 31,

    // 网关路由匹配错误
    gatewayRouterMatchError = 32,

    // 网关上游API调用错误
    gatewayUpstreamApiError = 33,

    // 异常占位区
    apiError = 100,
}

/**
 * 认证身份类型
 */
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

/**
 * 资源类型
 */
export enum ResourceTypeEnum {

    /**
     * 图片资源
     */
    IMAGE = 'image',

    /**
     * 音频资源
     */
    AUDIO = 'audio',

    /**
     * 视频资源
     */
    VIDEO = 'video',

    /**
     * markdown资源
     */
    MARKDOWN = 'markdown',

    /**
     * 组合资源
     */
    THEME = 'theme',

    /**
     * 滑块
     */
    REVEAL_SLIDE = 'reveal_slide',

    /**
     * 插件
     */
    WIDGET = 'widget',

    /**
     * 协议
     */
    LICENSE = 'license'

}

/**
 * 标的物类型
 */
export enum SubjectTypeEnum {
    /**
     * 资源
     */
    Resource = 1,

    /**
     * 展品
     */
    Presentable = 2,

    /**
     * 用户组
     */
    UserGroup = 3
}

/**
 * 状态色块类型枚举
 */
export enum ContractColorStateTypeEnum {

    /**
     * 正式授权
     */
    Authorization = 1,

    /**
     * 测试授权
     */
    TestAuthorization = 2,

    /**
     * 标签
     */
    Label = 3
}

/**
 * 合同乙方的身份类型
 */
export enum ContractLicenseeIdentityTypeEnum {
    /**
     * 资源方
     */
    Resource = 1,

    /**
     * 节点
     */
    Node = 2,

    /**
     * C端消费者
     */
    ClientUser = 3
}

/**
 * 合同状态枚举
 */
export enum ContractStatusEnum {
    /**
     * 正常生效中
     */
    Executed = 0,

    /**
     * 合同已终止(未授权,并且不再接受新事件)
     * @type {number}
     */
    Terminated = 1,

    /**
     * 异常的,例如签名不对,冻结等.
     * @type {number}
     */
    Exception = 2
}

/**
 * 授权码规则:
 * 以2开头的代表通过授权,例如200,201,202
 * 以3开头的代表标的物的合同方面存在问题或未通过授权
 * 以4开头的代表标的物本身存在问题,例如为找到标的物、标的物状态不对等错误
 * 以5开头的代表甲方或乙方存在问题,例如节点被冻结、未登陆(乙方用户认证失败)非法请求等错误
 * 以9开头代表API内部异常,例如内部API调用失败、代码异常、参数不全等错误
 */
export enum SubjectAuthCodeEnum {

    /**
     * 默认授权状态,代表初始状态null.未获得授权
     */
    Default = 0,

    /**
     * 基于合同授权
     */
    BasedOnContractAuthorized = 200,

    /**
     * 基于空认证(非登录用户等)的策略授权
     */
    BasedOnNullIdentityPolicyAuthorized = 201,

    /**
     * 基于最后的授权结果缓存授权,例如token
     */
    BasedOnLatestAuthCacheAuthorized = 202,

    /**
     * 默认授权,例如单一资源或者全部上抛依赖的资源
     */
    BasedOnDefaultAuth = 203,

    /**
     * 合同未获得授权
     */
    SubjectContractUnauthorized = 301,

    /**
     * 策略授权失败
     */
    NullIdentityPolicyUnauthorized = 302,

    /**
     * 标的物合同未找到,可能为数据丢失,或者指定的合同ID错误
     */
    SubjectContractNotFound = 303,

    /**
     * 标的物合同已终止(合同本身的状态为终止态)
     */
    SubjectContractTerminated = 304,

    /**
     * 标的物合同无效,例如指定的合同与标的物之间无关联
     */
    SubjectContractInvalid = 305,

    /**
     * 标的物合同异常(合同本身的状态为异常态)
     */
    SubjectContractException = 306,

    /**
     * 标的物合同未完成签约,例如某些异常可能导致数据不完整
     */
    SubjectContractNotCompleteSign = 307,

    /**
     * 标的物不存在
     */
    SubjectNotFound = 401,

    /**
     * 标的物已下线,展品下线后即使有合约也无法查看.或者通过策略授权的资源.
     */
    SubjectNotOnline = 402,

    /**
     * 标的物异常,例如被冻结
     */
    SubjectException = 403,

    /**
     * 未通过策略的签约前置条件验证
     */
    PolicyPreconditionVerificationNotPass = 501,

    /**
     * 未登陆的用户
     */
    UserUnauthenticated = 502,

    /**
     * 用户未获得授权,例如测试节点
     */
    LoginUserUnauthorized = 503,

    /**
     * 甲方主体异常,例如节点被冻结
     */
    licensorException = 504,

    /**
     * 乙方主体异常
     */
    licenseeException = 505,

    /**
     * 授权接口异常
     */
    AuthApiException = 900,

    /**
     * 授权请求参数错误
     */
    AuthArgumentsError = 901,

    /**
     * 授权数据校验失败错误
     */
    AuthDataValidateFailedError = 902
}

/**
 * 响应类型
 */
export enum CurlResFormatEnum {

    /**
     * 返回原始响应
     */
    Original = 1,

    /**
     * 返回freelogAPI格式的data部分
     */
    FreelogApiData = 2,

    /**
     * 返回原始响应的data部分
     */
    OriginalData = 3
}

