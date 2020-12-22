import {RetCodeEnum, ErrCodeEnum} from './enum';

class ApplicationErrorBase extends Error {

    data;
    retCode: RetCodeEnum;
    errCode: ErrCodeEnum;

    constructor(message: string, ...args) {
        super();
        const errorName = this.constructor.name;

        this.data = args[0];
        this.name = errorName;
        this.message = message;
        this.retCode = RetCodeEnum.success;
        this.errCode = ErrCodeEnum[errorName.replace(errorName[0], errorName[0].toLowerCase())] ?? ErrCodeEnum.applicationError;
    }
}

class AutoSnapError extends ApplicationErrorBase {
}

/**
 * 逻辑错误
 */
class LogicError extends ApplicationErrorBase {
}

/**
 * 网络错误
 */
class NetworkError extends ApplicationErrorBase {
}

/**
 * 参数错误
 */
class ArgumentError extends ApplicationErrorBase {
}

/**
 * 应用程序内部错误
 */
class ApplicationError extends ApplicationErrorBase {
}

/**
 * 授权错误
 */
class AuthorizationError extends ApplicationErrorBase {
}

/**
 * API调用错误
 */
class ApiInvokingError extends ApplicationErrorBase {
}

/**
 * 认证错误
 */
class AuthenticationError extends ApplicationErrorBase {
}

class ApplicationRouterMatchError extends ApplicationErrorBase {
}

class DatabaseConnectionError extends ApplicationErrorBase {
}

/**
 * 网关授权错误
 */
class GatewayAuthorizationError extends ApplicationErrorBase {
    constructor(message: string, ...args) {
        super(message, ...args);
        this.retCode = RetCodeEnum.agentError;
        this.errCode = ErrCodeEnum.authorizationError;
    }
}

/**
 * 网关认证错误
 */
class GatewayAuthenticationError extends ApplicationErrorBase {
    constructor(message: string, ...args) {
        super(message, ...args);
        this.retCode = RetCodeEnum.agentError;
        this.errCode = ErrCodeEnum.authenticationError;
    }
}

/**
 * 网关服务器组件调用异常
 */
class GatewayComponentInvokingError extends ApplicationErrorBase {
    constructor(message: string, ...args) {
        super(message, ...args);
        this.retCode = RetCodeEnum.agentError;
        this.errCode = ErrCodeEnum.gatewayHttpComponentInvokingError;
    }
}

/**
 * 网关路由匹配错误
 */
class GatewayRouterMatchError extends ApplicationErrorBase {
    constructor(message: string, ...args) {
        super(message, ...args);
        this.retCode = RetCodeEnum.agentError;
    }
}

/**
 * 网关上游API调用错误
 */
class GatewayUpstreamApiError extends ApplicationErrorBase {
    constructor(message: string, ...args) {
        super(message, ...args);
        this.retCode = RetCodeEnum.agentError;
    }
}

/**
 * 网关参数错误
 */
class GatewayArgumentError extends ApplicationErrorBase {
    constructor(message: string, ...args) {
        super(message, ...args);
        this.retCode = RetCodeEnum.agentError;
        this.errCode = ErrCodeEnum.argumentError;
    }
}

/**
 * 中断操作.此错误抛出前需要对响应做好处理.错误拦截器是不会对此错误做出任何反应.只是会中断程序的执行.
 */
class BreakOffError extends Error {

}

export {
    ApplicationErrorBase,
    AutoSnapError,
    LogicError,
    NetworkError,
    ArgumentError,
    ApplicationError,
    ApiInvokingError,
    AuthorizationError,
    AuthenticationError,
    ApplicationRouterMatchError,
    DatabaseConnectionError,
    GatewayArgumentError,
    GatewayRouterMatchError,
    GatewayUpstreamApiError,
    GatewayAuthorizationError,
    GatewayAuthenticationError,
    GatewayComponentInvokingError,
    BreakOffError,
};

