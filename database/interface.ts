import {PageResult} from '..';

export interface IDataBaseOperation {

    dataBaseType: string;

    create(...args): Promise<any>;

    insertMany(...args): Promise<any>;

    count(...args): Promise<any>;

    findOne(...args): Promise<any>;

    findById(...args): Promise<any>;

    find(...args): Promise<any>;

    findPageList(...args): Promise<any>;

    updateOne(...args): Promise<any>;

    updateMany(...args): Promise<any>;

    deleteOne(...args): Promise<any>;

    deleteMany(condition): Promise<any>;
}

/**
 * 全部方法参考wiki:https://mongoosejs.com/docs/api/model.html#model_Model.aggregate
 */
export interface IMongodbOperation<T> extends IDataBaseOperation {

    /**
     * 子类扩展的方法
     */
    [key: string]: any;

    /**
     * 原生schema
     */
    model: any;

    /**
     * 聚合,wiki:https://mongoosejs.com/docs/api/model.html#model_Model.aggregate
     * @param args
     */
    aggregate(...args): Promise<any>;

    /**
     * 创建model
     * @param model
     * @param args
     */
    create(model: object, ...args): Promise<T>;

    /**
     * 插入多条数据
     * @param models
     * @param args
     */
    insertMany(models: object[], ...args): Promise<T[]>;

    /**
     * 统计数量
     * @param condition
     */
    count(condition: object): Promise<number>;

    /**
     * 查找一条数据
     * @param condition
     * @param projection
     * @param options
     */
    findOne(condition: object, projection?: string, options?: object): Promise<T>;

    /**
     * 根据ID查询
     * @param id
     * @param projection
     * @param options
     */
    findById(id: any, projection?: string, options?: object): Promise<T>;

    /**
     * 根据条件查询多条
     * @param condition
     * @param projection
     * @param options
     */
    find(condition: object, projection?: string, options?: object): Promise<T[]>;

    /**
     * [已过时]查询分页列表
     * @param condition
     * @param page
     * @param pageSize
     * @param projection
     * @param sort
     */
    findPageList(condition: object, page?: number, pageSize?: number, projection?: string, sort?: object): Promise<T[]>;

    /**
     * 查询区间列表,返回分页数据,用于替代findPageList
     * @param condition
     * @param skip
     * @param limit
     * @param projection
     * @param sort
     */
    findIntervalList(condition: object, skip?: number, limit?: number, projection?: string, sort?: object): Promise<PageResult<T>>;

    /**
     * 查找单条数据
     * @param condition
     * @param model
     * @param args
     */
    findOneAndUpdate(condition: object, model: object, ...args): Promise<T>;

    /**
     * 更新一条数据
     * @param condition
     * @param model
     * @param args
     */
    updateOne(condition: object, model: object, ...args): Promise<{ n: number, nModified: number, ok: number }>;

    /**
     * 更新多条数据
     * @param condition
     * @param model
     * @param args
     */
    updateMany(condition: object, model: object, ...args): Promise<{ n: number, nModified: number, ok: number }>;

    /**
     * 删除一条数据
     * @param condition
     * @param args
     */
    deleteOne(condition: object, ...args): Promise<{ n: number, nModified: number, ok: number }>;

    /**
     * 删除多条数据
     * @param condition
     * @param args
     */
    deleteMany(condition: object, ...args): Promise<{ n: number, nModified: number, ok: number }>;
}

export interface IMongooseModelBase {
    buildMongooseModel(...args): any;
}
