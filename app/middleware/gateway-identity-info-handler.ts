import {isString} from 'util';
import {FreelogContext} from '../../index';

export default function fooMiddleware(): any {

    return async (ctx: FreelogContext, next: () => Promise<any>) => {

        // 网关服务会在每次请求把身份信息以base64编码的json格式字符串传递过来.属于可信范畴的认证信息.后期也可以考虑加入签名校验
        const authTokenStr = ctx.headers['auth-token'];
        if (!isString(authTokenStr)) {
            await next();
            return;
        }

        const identityInfo = JSON.parse(Buffer.from(authTokenStr, 'base64').toString());
        const {userInfo, nodeInfo, clientInfo} = identityInfo;
        ctx.userId = userInfo?.userId ?? 0;
        ctx.nodeId = nodeInfo?.nodeId ?? 0;
        ctx.clientId = clientInfo?.clientId ?? 0;
        ctx.identityInfo = identityInfo ?? {};

        await next();
    };
}
