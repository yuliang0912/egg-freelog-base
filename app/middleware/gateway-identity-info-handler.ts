import {isString} from 'util';
import {FreelogContext} from '../../index';

export default function fooMiddleware(): any {

    return async (ctx: FreelogContext, next: () => Promise<any>) => {

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
