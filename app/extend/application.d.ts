import { FreelogApplication, IRestfulWebApi } from '../../index';
declare const _default: {
    /**
     * 内部网络URL地址
     */
    readonly webApi: IRestfulWebApi;
    /**
     * 发送事件到所有cluster-app中
     */
    sendMessageToClusterWorker(this: FreelogApplication, eventName: string, data: any): void;
    /**
     * 发送事件到所有cluster-app中
     */
    sendMessageToClusterRandomWorker(this: FreelogApplication, eventName: string, data: any): void;
};
export default _default;
