import {IMongooseModelBase} from '../index';

export class MongooseModelBase implements IMongooseModelBase {

    protected mongoose;

    constructor(mongooseConnection: any) {
        /**
         * WIKI:https://mongoosejs.com/docs/api/connection.html
         */
        this.mongoose = mongooseConnection;
        if (mongooseConnection.readyState === 1) {
            return this.buildMongooseModel();
        } else {
            // 如果连接已经释放,则重新创建一个新的连接
            mongooseConnection.reconnect();
            throw new Error('database connection error!');
        }
    }

    buildMongooseModel(): any {
        throw new Error('not implemented');
    }
}
