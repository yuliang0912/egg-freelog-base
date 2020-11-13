import { IRestfulWebApi } from '../index';
export declare class RestFulWebApis implements IRestfulWebApi {
    baseUrl: string;
    constructor(baseUrl: string);
    /**
     * 用户信息
     * @returns {string}
     */
    get userInfo(): string;
    /**
     * 资源信息
     * @returns {string}
     */
    get resourceInfo(): string;
    /**
     * 获取presentable信息
     */
    get presentableInfo(): string;
    /**
     * 获取节点信息
     * @returns {string}
     */
    get nodeInfo(): string;
    /**
     * 测试节点
     */
    get testNode(): string;
    /**
     * 授权方案
     * @returns {string}
     */
    get authSchemeInfo(): string;
    /**
     * 发行信息
     * @returns {string}
     */
    get releaseInfo(): string;
    /**
     * 合同信息
     * @returns {string}
     */
    get contractInfo(): string;
    /**
     * 授权信息
     * @returns {string}
     */
    get authInfo(): string;
    /**
     * 用户/节点分组
     * @returns {string}
     */
    get groupInfo(): string;
    /**
     * 统计计次服务
     * @returns {string}
     */
    get statisticsInfo(): string;
    /**
     * 账户信息
     * @returns {string}
     */
    get accountInfo(): string;
    /**
     * 支付信息
     * @returns {string}
     */
    get pay(): string;
    /**
     * 存储信息
     * @returns {string}
     */
    get storageInfo(): string;
    /**
     * 策略信息
     * @returns {string}
     */
    get policyInfoV2(): string;
    /**
     * 资源信息
     * @returns {string}
     */
    get nodeInfoV2(): string;
    /**
     * 资源信息
     * @returns {string}
     */
    get resourceInfoV2(): string;
    /**
     * 获取presentable信息
     */
    get presentableInfoV2(): string;
    /**
     * 合同信息
     * @returns {string}
     */
    get contractInfoV2(): string;
    /**
     * 授权信息
     * @returns {string}
     */
    get authInfoV2(): string;
}
