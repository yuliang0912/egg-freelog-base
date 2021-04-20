import {buildApiFormatData, jsonStringify} from '../../lib/freelog-common-func';
import {
    FreelogContext, ErrCodeEnum, RetCodeEnum,
    ApplicationRouterMatchError, ArgumentError, FreelogApplication, BreakOffError
} from '../../index';

async function errorAutoSnapAndHandle(ctx: FreelogContext, next: () => Promise<any>): Promise<void> {

    ctx.userId = 0;
    ctx.nodeId = 0;
    ctx.clientId = 0;
    ctx.errors = [];
    ctx.identityInfo = {};
    ctx.error = ctx.error.bind(ctx);
    ctx.success = ctx.success.bind(ctx);

    if (ctx.bodyParserError instanceof Error) {
        throw new ArgumentError('bodyParse数据转换异常,请检查传入的数据是否符合接口规范', {detail: ctx.bodyParserError.message});
    }

    await next();

    if (ctx.status === 404 && ctx.body === undefined && ctx.request.url === '/') {
        ctx.body = `this is service : ${ctx.app.config.name}`;
        return;
    }
    if (ctx.status === 404 && ctx.body === undefined) {
        throw new ApplicationRouterMatchError('路由不匹配,请检查url地址');
    }
    // 未设置body时,自动转换响应结果为null
    if (ctx.body === undefined && /^[23]\d{2}$/.test(ctx.status.toString())) {
        ctx.body = buildApiFormatData(RetCodeEnum.success, ErrCodeEnum.success, 'success', null);
        return;
    }
}

export default function errorAutoSnapHandleMiddleware(_options: object | null, app: FreelogApplication): any {

    return async (ctx: FreelogContext, next: () => Promise<any>) => {
        try {
            await errorAutoSnapAndHandle(ctx, next);
        } catch (e) {
            if (e instanceof BreakOffError) {
                return;
            }
            if (!(e instanceof Error)) {
                e = new Error(e?.toString());
            }
            e.retCode = e.retCode ?? RetCodeEnum.success;
            e.errCode = e.errCode ?? ErrCodeEnum.autoSnapError;
            const responseBody = buildApiFormatData(e.retCode, e.errCode, e.message ?? e.toString(), e.data);
            if (app.config.env === 'local' || app.config.env === 'test') {
                responseBody['_developmentError'] = e.stack ?? e.message ?? e.toString();
            }
            // 此前调用系统默认的JSON.Stringify偶尔会出错,改进用优化版本的.
            ctx.body = jsonStringify(responseBody);
            ctx.set('content-type', 'application/json; charset=utf-8');
        }
    };
}
