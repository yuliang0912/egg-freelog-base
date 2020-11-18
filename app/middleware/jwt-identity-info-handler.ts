import {isString} from 'util';
import {FreelogApplication, FreelogContext, JwtHelper} from '../../index';

export default function jwtIdentityInfoHandlerMiddleware(_options: object | null, _app: FreelogApplication): any {

    return async (ctx: FreelogContext, next: () => Promise<any>) => {

        const jwt_token = ctx.cookies.get('authInfo', {signed: false}) ?? ctx.headers.authorization;
        if (!isString(jwt_token)) {
            return await next();
        }

        const jwt = new JwtHelper(ctx.app.config['jwtAuth']?.['publicKey']);

        const verifyResult = jwt.verifyToken(jwt_token);
        if (!verifyResult.isVerify) {
            return await next()
        }

        ctx.userId = verifyResult.payLoad?.userId;
        ctx.identityInfo.userInfo = verifyResult.payLoad;

        await next();
    };
}
