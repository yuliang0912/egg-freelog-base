import {DatabaseConnectionError, IMongodbOperation, PageResult} from '../index';

/**
 * 实现了接口IMongodbOperation=>IDataBaseOperation.针对所有的DB操作进行了统一API的封装.
 * 最终实际调用依然是通过mongoose-model来处理数据的.
 * 具体全部的函数参考wiki:https://mongoosejs.com/docs/api/model.html
 * 此处只实现了常用的db操作.如果需要其他db操作可以通过model.[funcName]来调用.具体funcName参考上面的文档
 */
export class MongodbOperation<T> implements IMongodbOperation<T> {

    _schema;
    dataBaseType: 'mongodb';

    constructor(schemaModel) {
        this._schema = schemaModel;
    }

    /**
     *当前mongo操作实体
     * @return {*}
     */
    get model() {
        if (this._schema.db.readyState !== 1) {
            throw new DatabaseConnectionError('database connection error!');
        }
        return this._schema;
    }

    /**
     * 聚合查询
     * @param args
     * @return {*}
     */
    aggregate(...args): Promise<any> {
        return this.model.aggregate(...args).exec();
    }

    /**
     * 创建model
     * @param model
     * @param args
     */
    create(model: object, ...args): Promise<T> {
        return this.model.create(model, ...args);
    }

    /**
     * 插入多条数据
     * @param models
     * @param args
     */
    insertMany(models: object[], ...args): Promise<T[]> {
        return this.model.insertMany(models, ...args);
    }

    /**
     * 统计数量
     * @param condition
     */
    count(condition: object): Promise<number> {
        return this.model.countDocuments(condition).exec();
    }

    /**
     * 查找一条数据
     * @param condition
     * @param args
     */
    findOne(condition: object, ...args): Promise<T> {
        return this.model.findOne(condition, ...args).exec();
    }

    /**
     * 根据ID查询
     * @param id
     * @param args
     */
    findById(id: any, ...args): Promise<T> {
        return this.model.findById(id, ...args).exec();
    }

    /**
     * 根据条件查询多条
     * @param condition
     * @param args
     */
    find(condition: object, ...args): Promise<T[]> {
        return this.model.find(condition, ...args).exec();
    }

    /**
     * [已过时]查询分页列表
     * @param condition
     * @param page
     * @param pageSize
     * @param projection
     * @param sort
     */
    findPageList(condition: object, page?: number, pageSize?: number, projection?: string, sort?: object): Promise<T[]> {
        page = page ?? 1;
        pageSize = pageSize ?? 10;
        return this.model.find(condition, projection, {
            limit: (page - 1) * pageSize, skip: pageSize, sort: sort ?? {_id: 1},
        });
    }

    /**
     * 查询区间列表,返回分页数据,用于替代findPageList
     * @param condition
     * @param skip
     * @param limit
     * @param projection
     * @param sort
     */
    async findIntervalList(condition: object, skip?: number, limit?: number, projection?: string, sort?: object): Promise<PageResult<T>> {
        let dataList = [];
        skip = skip ?? 0;
        limit = limit ?? 10;
        const totalItem = await this.count(condition);
        if (totalItem > skip) {
            const options: any = {skip, limit};
            if (sort) {
                options.sort = sort;
            }
            dataList = await this.model.find(condition, projection, options);
        }
        return {skip, limit, totalItem, dataList};
    }

    /**
     * 查找单条数据
     * @param condition
     * @param model
     * @param args
     */
    findOneAndUpdate(condition: object, model: object, ...args): Promise<T> {
        return this.model.findOneAndUpdate(condition, model, ...args);
    }


    /**
     * 更新一条数据
     * @param condition
     * @param model
     * @param args
     */
    updateOne(condition: object, model: object, ...args): Promise<{ n: number, nModified: number, ok: number }> {
        return this.model.updateOne(condition, model, ...args).exec();
    }

    /**
     * 更新多条数据
     * @param condition
     * @param model
     * @param args
     */
    updateMany(condition: object, model: object, ...args): Promise<{ n: number, nModified: number, ok: number }> {
        return this.model.updateMany(condition, model, ...args).exec();
    }

    /**
     * 删除一条数据
     * @param condition
     * @param args
     */
    deleteOne(condition: object, ...args): Promise<{ n: number, nModified: number, ok: number }> {
        return this.model.deleteOne(condition, ...args).exec();
    }

    /**
     * 删除多条数据
     * @param condition
     * @param args
     */
    deleteMany(condition: object, ...args): Promise<{ n: number, nModified: number, ok: number }> {
        return this.model.deleteMany(condition, ...args).exec();
    }
}
