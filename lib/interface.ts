import {Stream} from "stream";
import {Context, Application} from 'egg';
import {
    ErrCodeEnum,
    RetCodeEnum,
    SubjectAuthCodeEnum,
    SubjectTypeEnum,
    ApplicationErrorBase,
    CurlResFormatEnum
} from "../index";
import {ValidatorResult} from "jsonschema";

export interface IApiDataFormat {
    ret: RetCodeEnum;
    errCode: ErrCodeEnum;
    msg: string;
    data: object | string | number | any[] | null;
}

export interface FreelogUserInfo {
    userId: number;
    username: string;
}

export interface FreelogRequestIdentityInfo {
    [key: string]: any;

    userInfo?: FreelogUserInfo;
}

export interface FreelogApplication extends Application {

    webApi: IRestfulWebApi;

    koaValidateExtend?: object;
}

export interface FreelogContext extends Context {

    app: FreelogApplication;
    userId: number;
    clientId: number;
    nodeId: number;

    identityInfo: FreelogRequestIdentityInfo;

    webApi: IRestfulWebApi;

    errors: object[];

    bodyParserError?: Error;

    /**
     * 响应成功的消息
     * @param data
     */
    success(this: FreelogContext, data: any): FreelogContext;

    /**
     * 错误响应
     * @param errorInfo
     */
    error(this: FreelogContext, errorInfo: ApplicationErrorBase | Error | string | undefined): void;

    validateParams(this: FreelogContext): FreelogContext;

    /**
     * 实体空值校验
     * @param entity
     * @param options
     */
    entityNullObjectCheck(entity: object | null, options?: { msg?: string, data?: any }): FreelogContext;

    /**
     * 用户身份ID与实体的用户属性之间是否匹配校验
     * @param entity
     * @param options
     */
    entityNullValueAndUserAuthorizationCheck(entity: object | null, options?: { msg?: string, data?: any, property?: string }): FreelogContext

    /**
     * 访客身份认证与授权
     * @param identityType
     */
    validateVisitorIdentity(this: FreelogContext, identityType: number): FreelogContext;

    curlIntranetApi(this: FreelogContext, url: string, options?: object, resFormat?: CurlResFormatEnum)
}

export interface IRestfulWebApi {
    userInfo: string;
    accountInfo: string;
    pay: string;
    storageInfo: string;
    policyInfoV2: string;
    nodeInfoV2: string;
    resourceInfoV2: string;
    presentableInfoV2: string;
    contractInfoV2: string;
    authInfoV2: string;
}

export interface IJsonSchemaValidate {
    validate(instance: object[] | object, ...args): ValidatorResult;
}

export interface IObjectStorageService {

    client;
    serverProvider: 'aliOss' | 'amazonS3'

    /**
     * 以buffer的形式写入文件
     * @param objectName 对象名,存在路径就用/分隔
     * @param fileBuffer 文件buffer
     * @param options
     */
    putBuffer(objectName: string, fileBuffer: Buffer, options?: object): Promise<any>;

    /**
     * 以流的形式写入文件
     * @param objectName 对象名,存在路径就用/分隔
     * @param fileStream 文件流,一般指可读流
     * @param options
     */
    putStream(objectName: string, fileStream: Stream, options?: object): Promise<any>;

    /**
     * 获取文件流
     * @param objectName 对象名,存在路径就用/分隔
     */
    getStream(objectName: string): Promise<any>;

    /**
     * 删除对象
     * @param objectName 对象名,存在路径就用/分隔
     */
    deleteObject(objectName: string): Promise<any>;

    /**
     * 复制对象
     * @param toObjectName
     * @param fromObjectName
     * @param options
     */
    copyObject(toObjectName: string, fromObjectName: string, options?: object): Promise<any>;
}

export interface ISubjectAuthResult {

    /**
     * 做出本次授权结果判定的服务
     */
    referee: SubjectTypeEnum;

    authCode: SubjectAuthCodeEnum;

    data?: any;

    errorMsg?: string;

    isAuth: boolean;
}

export interface PageResult<T> {
    /**
     * 当前页码(1开始)
     */
    page: number;

    /**
     * 每页数量
     */
    pageSize: number;

    /**
     * 总数量
     */
    totalItem: number;

    /**
     * 当前分页的数据集
     */
    dataList: T[];
}


