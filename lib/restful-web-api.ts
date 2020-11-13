import {IRestfulWebApi} from '../index';

export class RestFulWebApis implements IRestfulWebApi {

    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    /**
     * 用户信息
     * @returns {string}
     */
    get userInfo() {
        return `${this.baseUrl}/client/v1/userinfos`;
    }

    /**
     * 资源信息
     * @returns {string}
     */
    get resourceInfo() {
        return `${this.baseUrl}/client/v1/resources`;
    }

    /**
     * 获取presentable信息
     */
    get presentableInfo() {
        return `${this.baseUrl}/client/v1/presentables`;
    }

    /**
     * 获取节点信息
     * @returns {string}
     */
    get nodeInfo() {
        return `${this.baseUrl}/client/v1/nodes`;
    }

    /**
     * 测试节点
     */
    get testNode() {
        return `${this.baseUrl}/client/v1/testNodes`;
    }

    /**
     * 授权方案
     * @returns {string}
     */
    get authSchemeInfo() {
        return `${this.baseUrl}/client/v1/resources/authSchemes`;
    }

    /**
     * 发行信息
     * @returns {string}
     */
    get releaseInfo() {
        return `${this.baseUrl}/client/v1/releases`;
    }

    /**
     * 合同信息
     * @returns {string}
     */
    get contractInfo() {
        return `${this.baseUrl}/client/v1/contracts`;
    }

    /**
     * 授权信息
     * @returns {string}
     */
    get authInfo() {
        return `${this.baseUrl}/client/v1/auths`;
    }

    /**
     * 用户/节点分组
     * @returns {string}
     */
    get groupInfo() {
        return `${this.baseUrl}/client/v1/groups`;
    }

    /**
     * 统计计次服务
     * @returns {string}
     */
    get statisticsInfo() {
        return `${this.baseUrl}/client/v1/statistics`;
    }

    /**
     * 账户信息
     * @returns {string}
     */
    get accountInfo() {
        return `${this.baseUrl}/client/v1/pay/accounts`;
    }

    /**
     * 支付信息
     * @returns {string}
     */
    get pay() {
        return `${this.baseUrl}/client/v1/pay`;
    }

    /**
     * 存储信息
     * @returns {string}
     */
    get storageInfo() {
        return `${this.baseUrl}/client/v1/storages`;
    }

    //=============================================V2====================================================

    /**
     * 策略信息
     * @returns {string}
     */
    get policyInfoV2() {
        return `${this.baseUrl}/client/v2/policies`;
    }

    /**
     * 资源信息
     * @returns {string}
     */
    get nodeInfoV2() {
        return `${this.baseUrl}/client/v2/nodes`;
    }

    /**
     * 资源信息
     * @returns {string}
     */
    get resourceInfoV2() {
        return `${this.baseUrl}/client/v2/resources`;
    }

    /**
     * 获取presentable信息
     */
    get presentableInfoV2() {
        return `${this.baseUrl}/client/v2/presentables`;
    }

    /**
     * 合同信息
     * @returns {string}
     */
    get contractInfoV2() {
        return `${this.baseUrl}/client/v2/contracts`;
    }

    /**
     * 授权信息
     * @returns {string}
     */
    get authInfoV2() {
        return `${this.baseUrl}/client/v2/auths`;
    }
}
