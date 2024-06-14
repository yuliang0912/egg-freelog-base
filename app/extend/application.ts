import {
    ApiInvokingError,
    ApplicationError,
    ArgumentError,
    CurlResFormatEnum,
    FreelogApplication,
    FreelogUserInfo,
    IRestfulWebApi
} from '../../index';
import {RestFulWebApis} from '../../lib/restful-web-api';
import {URL} from 'url';
import {base64Encode, hmacSha1} from '../../lib/crypto-helper';
import {convertIntranetApiResponseData} from '../../lib/freelog-common-func';

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
     * 内部curl请求,用户跨服务api调用
     * @param url
     * @param userInfo
     * @param options
     * @param resFormat
     */
    async curlIntranetApi(this: FreelogApplication, url: string, userInfo?: Partial<FreelogUserInfo>, options?: object, resFormat: CurlResFormatEnum = CurlResFormatEnum.FreelogApiData) {

        const {clientCredentialInfo} = this.config;
        if (!clientCredentialInfo) {
            throw new ArgumentError('未找到clientCredentialInfo配置信息');
        }
        const opt: any = Object.assign({headers: {}}, options ?? {});

        if (resFormat === CurlResFormatEnum.FreelogApiData) {
            opt.dataType = 'json';
        }

        const timeLine = Math.round(new Date().getTime() / 1000);

        const {pathname, search} = new URL(url);
        const text = `${pathname + search}&timeline=${timeLine}`;

        opt.headers['clientid'] = clientCredentialInfo.clientId;
        opt.headers['timeline'] = timeLine;
        opt.headers['sign'] = hmacSha1(text, clientCredentialInfo.privateKey);

        if (userInfo?.userId) {
            const token = base64Encode(JSON.stringify({userInfo}));
            const sign = hmacSha1(token, clientCredentialInfo.privateKey);
            opt.headers['authentication'] = `${token}:${sign}`;
        }
        return this.curl(url, opt).then(response => {
            if (resFormat === CurlResFormatEnum.FreelogApiData) {
                // freelog标准返回格式为 {ret:number,errCode:number,data:any }
                return convertIntranetApiResponseData(response.data, url, options);
            } else if (resFormat === CurlResFormatEnum.OriginalData) {
                // 原始返回,但是只返回data部分
                return response.data;
            } else if (resFormat === CurlResFormatEnum.Original) {
                return response;
            } else {
                throw new ApplicationError('不能识别的resFormat');
            }
        }).catch(error => {
            if (error instanceof ApiInvokingError) {
                throw error;
            }
            throw new ApiInvokingError(error.message || error.toString(), {
                url, options, _developmentError: error?._developmentError ?? undefined
            });
        });
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

    /**
     * 修复中括号无法被正确的编码错误
     * @param str
     */
    fixedEncodeURI(str: string): string {
        return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
    },
};
