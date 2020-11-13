export declare class JwtHelper {
    publicKey: string;
    privateKey?: string;
    constructor(publicKey: string, privateKey?: string);
    /**
     * 生成token
     * @param payload
     * @param expire
     */
    generateToken(payload: object, expire?: number): string;
    /**
     * 校验token是否有效
     * @param token
     */
    verifyToken(token: string): {
        isVerify: boolean;
        payLoad: any;
        error: string | null;
    };
    /**
     * 获取有效期
     * @param expireSpan
     */
    getExpire(expireSpan: number): number;
}
