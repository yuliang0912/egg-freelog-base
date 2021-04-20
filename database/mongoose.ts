import {FreelogApplication} from "../index";

async function createConnection(app: FreelogApplication, mongoose, config) {

    /**
     * wiki:https://mongoosejs.com/docs/api/connection.html
     */
    const connection = mongoose.createConnection(config.url, config.options);

    connection.Schema = mongoose.Schema;

    connection.reconnect = function () {
        /**
         * Connection ready state
         0 = disconnected
         1 = connected
         2 = connecting
         3 = disconnecting
         */
        if (connection.readyState === 0) {
            return createConnection(app, mongoose, config);
        }
    };

    connection.getNewObjectId = () => {
        return new mongoose.Types.ObjectId;
    };
    connection.convertObjectId = (strId) => {
        return new mongoose.Types.ObjectId(strId);
    };

    app['mongoose'] = connection;
    app['_mongoose'] = mongoose;

    return new Promise(function (resolve, reject) {
        // 连接成功
        connection.on('connected', function () {
            console.log('Mongoose connection open to ' + config.url);
            resolve(connection);
        }).on('error', function (error) {
            reject(error);
            console.log('mongodb connection failed, ' + error.toString());
        }).on('disconnected', function () {
            console.log('Mongoose connection disconnected');
            reject();
        });
    });
}

export default async function (app: FreelogApplication) {

    const config = app.config.mongoose;
    if (!config || config.enable === false) {
        return;
    }

    const mongoose = require('mongoose');

    config.options = Object.assign({
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        bufferCommands: false,
        useFindAndModify: false,
        autoIndex: true, //auto build indexes
        poolSize: 5, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
    }, config.options ?? {});

    return createConnection(app, mongoose, config);
}
