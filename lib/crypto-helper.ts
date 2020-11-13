import * as crypto from 'crypto'
import {HexBase64Latin1Encoding} from "crypto";

/**
 * RsaSha256Sign签名
 * @param text 需要签名的文本
 * @param key  签名用的私key
 * @param encoding 数据格式
 * @returns {string} 签名之后的文本
 */
export function rsaSha256Sign(text: string, privateKey: string, encoding: HexBase64Latin1Encoding = "hex"): string {
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(text);
    return sign.sign(privateKey, encoding);
}

/**
 * 签名验证
 * @param text 需要签名的文本
 * @param sign 签名
 * @param publicKey 公key
 * @param encoding 数据格式
 * @returns {bool}
 */
export function rsaSha256Verify(text: string, sign: string, publicKey: string, encoding: HexBase64Latin1Encoding = "hex"): boolean {
    const verify = crypto.createVerify('RSA-SHA256');
    verify.update(text);
    return verify.verify(publicKey, sign, encoding);
}


/**
 * sha512加密
 * @param text 需要加密的内容
 * @param encoding 格式
 * @returns {string}
 */
export function sha512(text, encoding: HexBase64Latin1Encoding = "hex"): string {
    return crypto.createHash('sha512').update(text).digest(encoding);
}

/**
 * hmacSha1加密
 * @param text 需要加密的内容
 * @param key  加密使用的key
 * @param encoding 数据格式
 */
export function hmacSha1(text, key, encoding: HexBase64Latin1Encoding = "hex") {
    return crypto.createHmac('sha1', key).update(text).digest(encoding);
}

/**
 * md5加密
 * @param text 需要加密的文本
 * @param encoding 数据格式
 * @returns {string}
 */
export function md5(text: string, encoding: HexBase64Latin1Encoding = 'hex') {
    return crypto.createHash('md5').update(text).digest(encoding);
}

/**
 * 3des加密
 * @param text 加密文本
 * @param key  加密key
 * @param iv   加密iv
 * @returns {string}
 */
export function des3Cipher(text: string, key: any, iv: any) {
    const cipher = crypto.createCipheriv('des-ede3', Buffer.from(key), Buffer.from(iv ? iv : 0));
    let txt = cipher.update(text, 'utf8', 'hex');
    txt += cipher.final('hex');
    return txt;
}

/**
 * 3des解密
 * @param text 待解密文本
 * @param key  加密/解密key
 * @param iv   加密/解密iv
 * @returns {string}
 */
export function des3Decipher(text: string, key: any, iv: any) {
    let decipher = crypto.createDecipheriv('des-ede3', Buffer.from(key), Buffer.from(iv ? iv : 0));
    let txt = decipher.update(text, 'hex', 'utf8');
    txt += decipher.final('utf8');
    return txt;
}

/**
 * base64编码
 * @param text
 * @returns {string}
 */
export function base64Encode(text: string) {
    return Buffer.from(text).toString('base64');
}

/**
 * base64解码
 * @param text
 * @returns {string}
 */
export function base64Decode(text: string) {
    return Buffer.from(text, 'base64').toString();
}


