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

export interface IMongodbOperation<T> extends IDataBaseOperation {
    model: any;

    aggregate(...args): Promise<any>;

    create(...args): Promise<T>;

    insertMany(...args): Promise<T[]>;

    count(...args): Promise<number>;

    findOne(...args): Promise<T>;

    findById(...args): Promise<T>;

    find(...args): Promise<T[]>;

    findPageList(...args): Promise<T[]>;

    updateOne(...args): Promise<{ n: number, nModified: number, ok: number }>;

    updateMany(...args): Promise<{ n: number, nModified: number, ok: number }>;

    deleteOne(...args): Promise<{ n: number, nModified: number, ok: number }>;

    deleteMany(condition): Promise<{ n: number, nModified: number, ok: number }>;

    findOneAndUpdate(condition, ...args): Promise<T>;
}

export interface IMongooseModelBase {
    buildMongooseModel(...args): any;
}
