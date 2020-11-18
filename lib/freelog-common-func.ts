import {isNullOrUndefined, isNumber} from 'util';
import {
    ErrCodeEnum,
    RetCodeEnum,
    ApiInvokingError,
    IApiDataFormat
} from '../index';

export function buildApiFormatData(ret: RetCodeEnum, errCode: ErrCodeEnum, msg: string, data: any): IApiDataFormat {
    return {
        ret, errCode, msg, data: isNullOrUndefined(data) ? null : data
    }
}

export async function convertIntranetApiResponseData(data: any, url: string, options?: object) {
    if (isNullOrUndefined(data)) {
        throw new ApiInvokingError('api response data is null', {url, options});
    }
    if (Reflect.has(data, 'errcode') && isNumber(data.errcode)) {
        data.errCode = data.errcode; // 兼容旧版
    }
    if (Object.prototype.toString.call(data) !== '[object Object]' || !isNumber(data.ret) || !isNumber(data.errCode)) {
        throw new ApiInvokingError('api response data is error format');
    }
    if (data.ret !== RetCodeEnum.success || data.errCode !== ErrCodeEnum.success) {
        throw new ApiInvokingError(data.msg ?? 'null error msg', {url, options, apiInvokingAttachData: data.data});
    }
    return data.data;
}

export function isClass(fn): boolean {

    const toString = Function.prototype.toString;

    function fnBody(fn) {
        return toString.call(fn).replace(/^[^{]*{\s*/, '').replace(/\s*}[^}]*$/, '');
    }

    return (typeof fn === 'function' &&
        (/^class\s/.test(toString.call(fn)) ||
            (/^.*classCallCheck\(/.test(fnBody(fn)))) // babel.js
    );
}

export function jsonStringify(obj: object): string {
    let cache = [];
    // @ts-ignore
    const str = JSON.stringify(obj, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            // @ts-ignore
            if (cache.indexOf(value) !== -1) {
                try {
                    return JSON.parse(JSON.stringify(value));
                } catch (error) {
                    return
                }
            }
            // @ts-ignore
            cache.push(value);
        }
        return value;
    });
    // @ts-ignore
    cache = null;
    return str
}
