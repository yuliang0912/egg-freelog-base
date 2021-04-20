import {FreelogApplication, IRestfulWebApi} from '../../index';
import {RestFulWebApis} from '../../lib/restful-web-api';

const RESTFUL_WEB_API = 'singleton#freelog_restful_web_api';
const SEND_MSG_TO_CLUSTER_WORKER_EVENT = Symbol.for(`agent#sendToClusterWorkerEvent`);
const SEND_MSG_TO_CLUSTER_RANDOM_WORKER_EVENT = Symbol.for(`agent#sendToClusterRandomWorkerEvent`);

export default {

    get app() {
        return (this as any) as FreelogApplication;
    },

    /**
     * 内部网络URL地址
     */
    get webApi(): IRestfulWebApi {
        const that = (this as any) as FreelogApplication;
        const baseUrl = that.config.gatewayUrl;
        if (!this[RESTFUL_WEB_API]) {
            that.addSingleton(RESTFUL_WEB_API, new RestFulWebApis(baseUrl));
        }
        return that[RESTFUL_WEB_API].create;
    },

    /**
     * 发送事件到所有cluster-app中
     */
    sendMessageToClusterWorker(this: FreelogApplication, eventName: string, data: any): void {
        this.messenger.sendToAgent(SEND_MSG_TO_CLUSTER_WORKER_EVENT.toString(), {eventName, data});
    },

    /**
     * 发送事件到所有cluster-app中
     */
    sendMessageToClusterRandomWorker(this: FreelogApplication, eventName: string, data: any): void {
        this.messenger.sendToAgent(SEND_MSG_TO_CLUSTER_RANDOM_WORKER_EVENT.toString(), {eventName, data});
    },

};
