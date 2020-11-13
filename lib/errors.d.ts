import { RetCodeEnum, ErrCodeEnum } from './enum';
declare class ApplicationErrorBase extends Error {
    data: any;
    retCode: RetCodeEnum;
    errCode: ErrCodeEnum;
    constructor(message: string, ...args: any[]);
}
declare class AutoSnapError extends ApplicationErrorBase {
}
/**
 * 逻辑错误
 */
declare class LogicError extends ApplicationErrorBase {
}
/**
 * 网络错误
 */
declare class NetworkError extends ApplicationErrorBase {
}
/**
 * 参数错误
 */
declare class ArgumentError extends ApplicationErrorBase {
}
/**
 * 应用程序内部错误
 */
declare class ApplicationError extends ApplicationErrorBase {
}
/**
 * 授权错误
 */
declare class AuthorizationError extends ApplicationErrorBase {
}
/**
 * API调用错误
 */
declare class ApiInvokingError extends ApplicationErrorBase {
}
/**
 * 认证错误
 */
declare class AuthenticationError extends ApplicationErrorBase {
}
declare class ApplicationRouterMatchError extends ApplicationErrorBase {
}
declare class DatabaseConnectionError extends ApplicationErrorBase {
}
/**
 * 网关授权错误
 */
declare class GatewayAuthorizationError extends ApplicationErrorBase {
    constructor(message: string, ...args: any[]);
}
/**
 * 网关认证错误
 */
declare class GatewayAuthenticationError extends ApplicationErrorBase {
    constructor(message: string, ...args: any[]);
}
/**
 * 网关服务器组件调用异常
 */
declare class GatewayComponentInvokingError extends ApplicationErrorBase {
    constructor(message: string, ...args: any[]);
}
/**
 * 网关路由匹配错误
 */
declare class GatewayRouterMatchError extends ApplicationErrorBase {
    constructor(message: string, ...args: any[]);
}
/**
 * 网关上游API调用错误
 */
declare class GatewayUpstreamApiError extends ApplicationErrorBase {
    constructor(message: string, ...args: any[]);
}
/**
 * 网关参数错误
 */
declare class GatewayArgumentError extends ApplicationErrorBase {
    constructor(message: string, ...args: any[]);
}
export { ApplicationErrorBase, AutoSnapError, LogicError, NetworkError, ArgumentError, ApplicationError, ApiInvokingError, AuthorizationError, AuthenticationError, ApplicationRouterMatchError, DatabaseConnectionError, GatewayArgumentError, GatewayRouterMatchError, GatewayUpstreamApiError, GatewayAuthorizationError, GatewayAuthenticationError, GatewayComponentInvokingError };
