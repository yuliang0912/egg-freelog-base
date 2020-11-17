import {isUndefined, isError} from 'util';
import {buildApiFormatData, jsonStringify} from '../../lib/freelog-common-func'
import {
    FreelogContext, ErrCodeEnum, RetCodeEnum, ApplicationErrorBase,
    ApplicationRouterMatchError, ArgumentError, FreelogApplication
} from '../../index'

async function errorAutoSnapAndHandle(ctx: FreelogContext, next: () => Promise<any>): Promise<void> {

    ctx.userId = 0;
    ctx.nodeId = 0;
    ctx.clientId = 0;
    ctx.errors = [];
    ctx.identityInfo = {};
    ctx.error = ctx.error.bind(ctx);
    ctx.success = ctx.success.bind(ctx);

    if (isError(ctx.bodyParserError)) {
        throw new ArgumentError('bodyParse数据转换异常,请检查传入的数据是否符合接口规范', {detail: ctx.bodyParserError.message});
    }

    await next();

    if (isUndefined(ctx.body) && ctx.status === 404) {
        throw new ApplicationRouterMatchError('路由不匹配,请检查url地址')
    }

    // 未设置body时,自动转换响应结果为null
    if (isUndefined(ctx.body) && /^(2|3)\d{2}$/.test(ctx.status.toString())) {
        ctx.body = buildApiFormatData(RetCodeEnum.success, ErrCodeEnum.success, 'success', null);
    }
}

export default function fooMiddleware(_, app: FreelogApplication): any {

    return async (ctx: FreelogContext, next: () => Promise<any>) => {
        try {
            await errorAutoSnapAndHandle(ctx, next);
        } catch (e) {
            if (isError(e) && !(e instanceof ApplicationErrorBase)) {
                Object.assign(e, {
                    retCode: RetCodeEnum.success,
                    errCode: ErrCodeEnum.autoSnapError
                })
            }
            if (app.config.env === 'local' || app.config.env === 'test') {
                ctx.body = buildApiFormatData(e.retCode, e.errCode, e.stack || e.message || e.toString(), e.data)
            } else {
                ctx.body = buildApiFormatData(e.retCode, e.errCode, e.message || e.toString(), e.data)
            }
            ctx.body = jsonStringify(ctx.body);
            ctx.set('content-type', 'application/json; charset=utf-8');
        }
    };

}
