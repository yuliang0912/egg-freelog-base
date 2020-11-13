import { ErrCodeEnum, RetCodeEnum, FreelogContext, IApiDataFormat } from '../index';
export declare function buildApiFormatData(ret: RetCodeEnum, errCode: ErrCodeEnum, msg: string, data: any): IApiDataFormat;
export declare function initSetFreelogContextProperty(ctx: FreelogContext): void;
export declare function convertIntranetApiResponseData(data: any, url: string, options?: object): Promise<any>;
export declare function entityNullObjectCheck(entity: object | null, msg?: string, data?: any): void;
export declare function isClass(fn: any): boolean;
export declare function jsonStringify(obj: object): string;
