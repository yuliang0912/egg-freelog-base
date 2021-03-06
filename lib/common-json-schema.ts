import {Validator} from 'jsonschema';
import {ArgumentError, CommonRegex} from '../index';
import {isFunction, isString, isRegExp} from 'lodash';

export class CommonJsonSchema extends Validator {

    constructor() {
        super();
        this.__initialCustomFormats__();
    }

    /**
     * 注册freelog默认的自定义格式
     * @return {*}
     * @private
     */
    __initialCustomFormats__() {
        for (const [key, value] of Object.entries(CommonRegex)) {
            if (isRegExp(value)) {
                this.registerCustomFormats(key, value.test.bind(value));
            }
        }
    }

    /**
     * 注册自定义格式校验函数
     * @param formatName
     * @param fn
     */
    registerCustomFormats(formatName: string, fn: (input: string) => boolean) {

        if (!isString(formatName)) {
            throw new ArgumentError('args[0] must be string');
        }
        if (!isFunction(fn)) {
            throw new ArgumentError('args[1] must be function');
        }

        this.customFormats[formatName] = fn;
    }
}

