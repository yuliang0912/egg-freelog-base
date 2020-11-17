import {FreelogApplication} from "../index";

async function createConnection(app: FreelogApplication, mongoose, config) {

    const database = mongoose.createConnection(config.url, config.options)

    // 连接成功
    database.on('connected', function () {
        console.log('Mongoose connection open to ' + config.url);
    });

    // 连接失败
    database.on('error', connectionErrorHandler);

    // 断开连接
    database.on('disconnected', function () {
        console.log('Mongoose connection disconnected');
    })

    //重新连接
    database.on('reconnected', () => {
        app.coreLogger.info(`[egg-freelog-mongoose] ${config.url} reconnected successfully`);
    });

    database.Schema = mongoose.Schema;

    let isConnecting = false;
    database.reconnect = function () {
        if (database._readyState === 0 && !isConnecting) {
            isConnecting = true;
            return createConnection(app, mongoose, config).catch(connectionErrorHandler).finally(() => {
                isConnecting = false;
            });
        }
    }

    database.getNewObjectId = () => {
        return new mongoose.Types.ObjectId;
    }
    database.convertObjectId = (strId) => {
        return new mongoose.Types.ObjectId(strId);
    }

    app['mongoose'] = database;
    app['_mongoose'] = mongoose;

    return database;
}

function connectionErrorHandler(error) {
    console.log('mongodb connection failed, ' + error.toString())
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

    app.beforeStart(async () => {
        await createConnection(app, mongoose, config).catch(connectionErrorHandler);
    });
}
