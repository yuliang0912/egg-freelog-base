import {FreelogApplication, FreelogContext} from '../../index';

export default function localIdentityInfoMiddleware(_options: object | null, app: FreelogApplication): any {

    return async (ctx: FreelogContext, next: () => Promise<any>) => {

        // 如果网关调用,已经解析出身份信息,则不适用本地配置的用户信息
        if (ctx.userId > 0) {
            return await next();
        }

        const localIdentityInfo = app.config.localIdentity;

        if (Object.prototype.toString.call(localIdentityInfo) !== '[object Object]') {
            return await next();
        }

        ctx.identityInfo.userInfo = {
            userId: localIdentityInfo?.userId ?? 0,
            username: localIdentityInfo?.username ?? '',
            email: localIdentityInfo?.email ?? ''
        };
        ctx.userId = ctx.identityInfo.userInfo.userId;

        await next();
    };
}
