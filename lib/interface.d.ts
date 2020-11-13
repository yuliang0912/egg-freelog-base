/// <reference types="node" />
import { Stream } from "stream";
import { ErrCodeEnum, RetCodeEnum } from "./enum";
import { Context, Application } from 'egg';
import { ApplicationErrorBase } from "./errors";
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
    webApi(): IRestfulWebApi;
    koaValidateExtend?: object;
}
export interface FreelogContext extends Context {
    app: FreelogApplication;
    userId: number;
    clientId: number;
    nodeId: number;
    identityInfo: FreelogRequestIdentityInfo;
    webApi: IRestfulWebApi;
    errors: string[];
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
    /**
     * 实体空值校验
     * @param entity
     * @param msg
     * @param data
     */
    entityNullObjectCheck(this: FreelogContext, entity: object | null, msg?: string, data?: any): FreelogContext;
    /**
     * 用户身份ID与实体的用户属性之间是否匹配校验
     * @param entity
     * @param property
     * @param targetId
     */
    entityUserAuthorization(this: FreelogContext, entity: object | null, property?: string, targetId?: number): FreelogContext;
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
export interface IObjectStorageService {
    client: any;
    serverProvider: 'aliOss' | 'amazonS3';
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
export interface IDataBaseOperation {
    dataBaseType: string;
    create(...args: any[]): Promise<any>;
    insertMany(...args: any[]): Promise<any>;
    count(...args: any[]): Promise<any>;
    findOne(...args: any[]): Promise<any>;
    findById(...args: any[]): Promise<any>;
    find(...args: any[]): Promise<any>;
    findPageList(...args: any[]): Promise<any>;
    updateOne(...args: any[]): Promise<any>;
    updateMany(...args: any[]): Promise<any>;
    deleteOne(...args: any[]): Promise<any>;
    deleteMany(condition: any): Promise<any>;
}
export interface IMongodbOperation<T> extends IDataBaseOperation {
    model: any;
    aggregate(...args: any[]): Promise<any>;
    create(...args: any[]): Promise<T>;
    insertMany(...args: any[]): Promise<T[]>;
    count(...args: any[]): Promise<number>;
    findOne(...args: any[]): Promise<T>;
    findById(...args: any[]): Promise<T>;
    find(...args: any[]): Promise<T[]>;
    findPageList(...args: any[]): Promise<T[]>;
    updateOne(...args: any[]): Promise<{
        n: number;
        nModified: number;
        ok: number;
    }>;
    updateMany(...args: any[]): Promise<{
        n: number;
        nModified: number;
        ok: number;
    }>;
    deleteOne(...args: any[]): Promise<{
        n: number;
        nModified: number;
        ok: number;
    }>;
    deleteMany(condition: any): Promise<{
        n: number;
        nModified: number;
        ok: number;
    }>;
}
