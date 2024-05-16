import {FreelogApplication} from './index';
import koaValidateExtend from './lib/koa-validate-extend';
import {loaderCustomDirAndFile} from './lib/loader-custom-dir-and-file';
import {IBoot} from 'egg';
import {isObject} from 'lodash';

const koaValidate = require('koa-validate');

export default class FreelogBaseFrameworkAppBootHook implements IBoot {

    app: FreelogApplication;

    constructor(app: FreelogApplication) {
        this.app = app;
    }

    configWillLoad() {
        // 下一个大版本再发布.否则需要应用程序修改配置
        // this.app.config.coreMiddleware.unshift('errorAutoSnapHandler');
        // const index = this.app.config.coreMiddleware.indexOf('notfound');
        // if (index > -1) {
        //     this.app.config.coreMiddleware.splice(index, 1);
        // }
        // this.app.config.coreMiddleware.push('gatewayIdentityInfoHandler');
    }

    async willReady() {
        this.extendKoaValidateRuleHandle();
        this.loaderCustomDirAndFileHandle();
        this.uncaughtExceptionOrRejectionHandle();
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
        process.on('unhandledRejection', (reason: {} | null | undefined) => {
            console.log('process-on-unhandledRejection,[detail]:', reason);
        });
        process.on('uncaughtException', err => {
            console.log('process-on-uncaughtException,[detail]:' + err.toString());
        });
    }
}
