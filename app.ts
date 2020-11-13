import {isObject} from 'util';
import {FreelogApplication} from './index';
import * as koaValidateExtend from './lib/koa-validate-extend';
import {loaderCustomDirAndFile} from './lib/loader-custom-dir-and-file';
import mongoose from './database/mongoose'
import { IBoot } from 'egg';

const koaValidate = require('koa-validate')


export default class FreelogBaseFrameworkAppBootHook implements IBoot {

    app: FreelogApplication;

    constructor(app: FreelogApplication) {
        this.app = app;
    }

    async willReady() {
        this.extendKoaValidateRuleHandle();
        this.loaderCustomDirAndFileHandle();
        this.uncaughtExceptionOrRejectionHandle();
        await this.connectMongodb();
    }

    /**
     * 链接mongodb
     */
    async connectMongodb() {
        const mongooseConfig = this.app.config.mongoose;
        if (!isObject(mongooseConfig) || mongooseConfig.enable === false) {
            return;
        }
        return mongoose(this.app);
    }

    /**
     * 加载并且初始化自定义处理
     */
    loaderCustomDirAndFileHandle() {
        setImmediate(() => loaderCustomDirAndFile(this.app));
    }

    /**
     * 拓展校验规则
     */
    extendKoaValidateRuleHandle() {
        if (isObject(this.app.koaValidateExtend)) {
            Object.assign(koaValidate.Validator.prototype, this.app.koaValidateExtend);
        }
        Object.assign(koaValidate.Validator.prototype, koaValidateExtend);
        koaValidate(this.app);
    }

    /**
     * 未处理的错误处理
     */
    uncaughtExceptionOrRejectionHandle() {
        // @ts-ignore
        process.on('unhandledRejection', err => {
            console.log("process-on-unhandledRejection,[detail]:" + err.stack || err.toString());
        });
        // @ts-ignore
        process.on('uncaughtException', err => {
            console.log("process-on-uncaughtException,[detail]:" + err.stack || err.toString());
        });
    }
}
