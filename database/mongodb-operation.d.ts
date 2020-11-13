import { IMongodbOperation } from '../index';
export declare class MongodbOperation<T> implements IMongodbOperation<T> {
    _schema: any;
    dataBaseType: 'mongodb';
    constructor(schemaModel: any);
    /**
     *当前mongo操作实体
     * @returns {*}
     */
    get model(): any;
    /**
     * 聚合查询
     * @param args
     * @returns {*}
     */
    aggregate(...args: any[]): Promise<any>;
    /**
     * 创建实体
     * @param model
     */
    create(model: any, ...args: any[]): Promise<T>;
    /**
     * 查找并更新
     * @param args
     * @returns {*}
     */
    findOneAndUpdate(condition: any, ...args: any[]): Promise<T>;
    /**
     * 批量新增
     * @param models
     */
    insertMany(models: object[], ...args: any[]): Promise<T[]>;
    /**
     * 查询数量
     * @param condition
     */
    count(condition: object): Promise<number>;
    /**
     * 获取单个实体
     * @param condition
     * @returns {*}
     */
    findOne(condition: object, ...args: any[]): Promise<T>;
    /**
     * 根据ID查找
     * @param condition
     * @param args
     * @returns {*}
     */
    findById(condition: object, ...args: any[]): Promise<T>;
    /**
     * 获取列表
     * @param condition
     * @returns {*}
     */
    find(condition: object, ...args: any[]): Promise<T[]>;
    /**
     * 获取分页列表
     * @param condition
     * @param page
     * @param pageSize
     * @param projection
     */
    findPageList(condition: number, page?: number, pageSize?: number, projection?: string, sort?: object): Promise<T[]>;
    /**
     * 更新一条数据
     * @param condition
     * @param model
     * @param args
     * @returns {*}
     */
    updateOne(condition: object, model: object, ...args: any[]): Promise<{
        n: number;
        nModified: number;
        ok: number;
    }>;
    /**
     * 更新多条数据
     * @param condition
     * @param model
     * @param args
     * @returns {*}
     */
    updateMany(condition: object, model: object, ...args: any[]): Promise<{
        n: number;
        nModified: number;
        ok: number;
    }>;
    /**
     * 删除单条数据
     * @param condition
     * @returns {Promise<never>}
     */
    deleteOne(condition: object): Promise<{
        n: number;
        nModified: number;
        ok: number;
    }>;
    /**
     * 删除多条
     * @param condition
     * @returns {*}
     */
    deleteMany(condition: object): Promise<{
        n: number;
        nModified: number;
        ok: number;
    }>;
}
