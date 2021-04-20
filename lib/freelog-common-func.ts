import {
    ErrCodeEnum,
    RetCodeEnum,
    ApiInvokingError,
    IApiDataFormat,
} from '../index';
import {isNumber} from 'lodash';

export function buildApiFormatData(ret: RetCodeEnum, errCode: ErrCodeEnum, msg: string, data: any): IApiDataFormat {
    return {
        ret, errCode, errcode: errCode, msg, data: isNullOrUndefined(data) ? null : data,
    } as IApiDataFormat; // 先兼容旧版的errcode.后期会删除
}

export function convertIntranetApiResponseData(data: any, url: string, options?: object) {
    if (isNullOrUndefined(data)) {
        throw new ApiInvokingError('api response data is null', {url, options});
    }
    // if (Reflect.has(data, 'errcode') && isNumber(data.errcode)) {
    //     data.errCode = data.errcode; // 兼容旧版
    // }
    if (!isNumber(data?.ret) || !isNumber(data?.errCode)) {
        throw new ApiInvokingError('api response data is error format');
    }
    if (data.ret !== RetCodeEnum.success || data.errCode !== ErrCodeEnum.success) {
        throw new ApiInvokingError(data.msg ?? 'null error msg', {url, options, apiInvokingAttachData: data.data});
    }
    return data.data;
}

export function jsonStringify(obj: object): string {
    let cache: any[] = [];
    const str = JSON.stringify(obj, function (_key: string, value: any) {
        if (typeof value === 'object' && value !== null) {
            if (cache.includes(value)) {
                try {
                    return JSON.parse(JSON.stringify(value));
                } catch (error) {
                    return;
                }
            }
            cache.push(value);
        }
        return value;
    });
    cache.length = 0;
    return str;
}

export function isNullOrUndefined(arg) {
    return arg === null || arg === undefined;
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

//
// export function isError(arg) {
//     return arg instanceof Error;
// }
//
//
// export function isObject(arg) {
//     return toString.call(arg) === '[object Object]';
// }
//
// export function isString(arg) {
//     return toString.call(arg) === '[object String]';
// }
//
// export function isNumber(arg) {
//     return toString.call(arg) === '[object Number]';
// }
//
// export function isFunction(arg) {
//     return toString.call(arg) === '[object Function]';
// }
