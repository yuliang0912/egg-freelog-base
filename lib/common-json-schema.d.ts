import { Validator } from 'jsonschema';
export declare class CommonJsonSchema extends Validator {
    constructor();
    /**
     * 注册freelog默认的自定义格式
     * @returns {*}
     * @private
     */
    __initialCustomFormats__(): void;
    /**
     * 注册自定义格式校验函数
     * @param formatName
     * @param fn
     */
    registerCustomFormats(formatName: string, fn: (input: string) => boolean): void;
}
