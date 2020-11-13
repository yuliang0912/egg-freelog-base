/// <reference types="node" />
import { HexBase64Latin1Encoding } from "crypto";
/**
 * RsaSha256Sign签名
 * @param text 需要签名的文本
 * @param key  签名用的私key
 * @param encoding 数据格式
 * @returns {string} 签名之后的文本
 */
export declare function rsaSha256Sign(text: string, privateKey: string, encoding?: HexBase64Latin1Encoding): string;
/**
 * 签名验证
 * @param text 需要签名的文本
 * @param sign 签名
 * @param publicKey 公key
 * @param encoding 数据格式
 * @returns {bool}
 */
export declare function rsaSha256Verify(text: string, sign: string, publicKey: string, encoding?: HexBase64Latin1Encoding): boolean;
/**
 * sha512加密
 * @param text 需要加密的内容
 * @param encoding 格式
 * @returns {string}
 */
export declare function sha512(text: any, encoding?: HexBase64Latin1Encoding): string;
/**
 * hmacSha1加密
 * @param text 需要加密的内容
 * @param key  加密使用的key
 * @param encoding 数据格式
 */
export declare function hmacSha1(text: any, key: any, encoding?: HexBase64Latin1Encoding): string;
/**
 * md5加密
 * @param text 需要加密的文本
 * @param encoding 数据格式
 * @returns {string}
 */
export declare function md5(text: string, encoding?: HexBase64Latin1Encoding): string;
/**
 * 3des加密
 * @param text 加密文本
 * @param key  加密key
 * @param iv   加密iv
 * @returns {string}
 */
export declare function des3Cipher(text: string, key: any, iv: any): string;
/**
 * 3des解密
 * @param text 待解密文本
 * @param key  加密/解密key
 * @param iv   加密/解密iv
 * @returns {string}
 */
export declare function des3Decipher(text: string, key: any, iv: any): string;
/**
 * base64编码
 * @param text
 * @returns {string}
 */
export declare function base64Encode(text: string): string;
/**
 * base64解码
 * @param text
 * @returns {string}
 */
export declare function base64Decode(text: string): string;
