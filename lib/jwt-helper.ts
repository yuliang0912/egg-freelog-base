import {isObject, isString} from 'util';
import {ArgumentError, CryptoHelper} from '../index';

export class JwtHelper {

    publicKey: string;
    privateKey?: string;

    constructor(publicKey: string, privateKey?: string) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }

    /**
     * 生成token
     * @param payload
     * @param expire
     */
    generateToken(payload: object, expire?: number) {
        if (!isObject(payload)) {
            throw new ArgumentError('payload must be object');
        }
        if (isString(this.privateKey)) {
            throw new ArgumentError('private Key can not empty');
        }
        if (!Reflect.has(payload, 'exp')) {
            Reflect.set(payload, 'exp', this.getExpire(expire ?? 1296000)) // 默认14天过期
        }
        const header = {alg: "RSA-SHA256", typ: "JWT"};


        const headerBase64Str = CryptoHelper.base64Encode(JSON.stringify(header));
        const payloadBase64Str = CryptoHelper.base64Encode(JSON.stringify(payload));
        const signature = CryptoHelper.rsaSha256Sign(`${headerBase64Str}.${payloadBase64Str}`, this.privateKey ?? '');

        return `${headerBase64Str}.${payloadBase64Str}.${signature}`;
    }

    /**
     * 校验token是否有效
     * @param token
     */
    verifyToken(token: string) {

        if (!isString(token)) {
            throw new ArgumentError('token must be string');
        }
        if (token.startsWith('Bearer ')) {
            token = token.replace('Bearer ', '');
        }

        let isVerify = false;
        let payLoad: any = null;
        let error: string | null = null;

        const [header, payload, signature] = token.split('.');

        if (!isString(this.publicKey)) {
            error = 'public Key can not empty';
        } else {
            isVerify = CryptoHelper.rsaSha256Verify(`${header}.${payload}`, signature, this.publicKey)
        }

        if (!isVerify) {
            return {isVerify, payLoad, error};
        }

        payLoad = JSON.parse(CryptoHelper.base64Decode(payload));
        if (isVerify && payLoad.exp < this.getExpire(0)) {
            isVerify = false;
            error = 'token已超过有效期';
        }

        return {isVerify, payLoad, error};
    }

    /**
     * 获取有效期
     * @param expireSpan
     */
    getExpire(expireSpan: number) {
        return Math.round(new Date().getTime() / 1000) + expireSpan;
    }
}
