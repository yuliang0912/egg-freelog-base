import { FreelogApplication } from './index';
export default class FreelogBaseFrameworkAppBootHook {
    app: FreelogApplication;
    constructor(app: FreelogApplication);
    willReady(): Promise<void>;
    /**
     * 链接mongodb
     */
    connectMongodb(): Promise<void>;
    /**
     * 加载并且初始化自定义处理
     */
    loaderCustomDirAndFileHandle(): void;
    /**
     * 拓展校验规则
     */
    extendKoaValidateRuleHandle(): void;
    /**
     * 未处理的错误处理
     */
    uncaughtExceptionOrRejectionHandle(): void;
}
