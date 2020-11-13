import {isNumber} from 'util';
import {DatabaseConnectionError, IMongodbOperation} from '../index';

export class MongodbOperation<T> implements IMongodbOperation<T> {

    _schema;
    dataBaseType: 'mongodb';

    constructor(schemaModel) {
        this._schema = schemaModel;
    }

    /**
     *当前mongo操作实体
     * @returns {*}
     */
    get model() {
        if (!this._schema.db._readyState) {
            throw new DatabaseConnectionError('database connection error!');
        }
        return this._schema;
    }

    /**
     * 聚合查询
     * @param args
     * @returns {*}
     */
    aggregate(...args): Promise<any> {
        return this.model.aggregate(...args).exec();
    }

    /**
     * 创建实体
     * @param model
     */
    async create(model, ...args): Promise<T> {
        return this.model.create(model, ...args);
    }


    /**
     * 查找并更新
     * @param args
     * @returns {*}
     */
    async findOneAndUpdate(condition, ...args): Promise<T> {
        return this.model.findOneAndUpdate(condition, ...args);
    }


    /**
     * 批量新增
     * @param models
     */
    async insertMany(models: object[], ...args): Promise<T[]> {
        return this.model.insertMany(models, ...args);
    }

    /**
     * 查询数量
     * @param condition
     */
    async count(condition: object): Promise<number> {
        return this.model.countDocuments(condition).exec();
    }

    /**
     * 获取单个实体
     * @param condition
     * @returns {*}
     */
    async findOne(condition: object, ...args): Promise<T> {
        return this.model.findOne(condition, ...args).exec();
    }

    /**
     * 根据ID查找
     * @param condition
     * @param args
     * @returns {*}
     */
    async findById(condition: object, ...args): Promise<T> {
        return this.model.findById(condition, ...args).exec();
    }

    /**
     * 获取列表
     * @param condition
     * @returns {*}
     */
    async find(condition: object, ...args): Promise<T[]> {
        return this.model.find(condition, ...args).exec();
    }

    /**
     * 获取分页列表
     * @param condition
     * @param page
     * @param pageSize
     * @param projection
     */
    async findPageList(condition: number, page?: number, pageSize?: number, projection?: string, sort?: object): Promise<T[]> {
        const options: any = {sort};
        if (isNumber(page) && isNumber(pageSize)) {
            if (page < 1 || pageSize < 1) {
                return Promise.reject(new Error("参数page和pageSize必须大于0"))
            }
            options.skip = (page - 1) * pageSize
            options.limit = pageSize
        } else if (isNumber(pageSize)) {
            options.limit = pageSize
        }
        return this.model.find(condition, projection, options).exec();
    }

    /**
     * 更新一条数据
     * @param condition
     * @param model
     * @param args
     * @returns {*}
     */
    async updateOne(condition: object, model: object, ...args): Promise<{ n: number, nModified: number, ok: number }> {
        return this.model.updateOne(condition, model, ...args).exec();
    }

    /**
     * 更新多条数据
     * @param condition
     * @param model
     * @param args
     * @returns {*}
     */
    async updateMany(condition: object, model: object, ...args): Promise<{ n: number, nModified: number, ok: number }> {
        return this.model.updateMany(condition, model, ...args).exec();
    }

    /**
     * 删除单条数据
     * @param condition
     * @returns {Promise<never>}
     */
    async deleteOne(condition: object): Promise<{ n: number, nModified: number, ok: number }> {
        return this.model.deleteOne(condition).exec();
    }

    /**
     * 删除多条
     * @param condition
     * @returns {*}
     */
    async deleteMany(condition: object): Promise<{ n: number, nModified: number, ok: number }> {
        return this.model.deleteMany(condition).exec();
    }
}
