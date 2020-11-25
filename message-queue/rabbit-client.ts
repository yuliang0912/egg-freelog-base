// import * as Emitter from 'events';
// import {ApplicationError} from '../index';
//
// class RabbitClient extends Emitter implements IRabbitClient {
//
//     config: any;
//     isReady = false;
//     queues = new Map<string, any>();
//     exchange: any;
//     _awaitSubscribes = new Map<string, () => any>();
//
//     constructor(rabbitConfig: object) {
//         super();
//         this.config = rabbitConfig;
//     }
//
//     /**
//      * 订阅消息
//      * @param queueName
//      * @param callback
//      */
//     subscribe(queueName, callback) {
//
//         if (!Array.isArray(this.config.queues) || this.config.queues.length === 0) {
//             throw new ApplicationError("当前exchange上没有队列,请查看配置文件")
//         }
//         if (!this.config.queues.some(t => t.name === queueName)) {
//             throw new ApplicationError("当前exchange上不存在指定的队列名")
//         }
//
//         /**
//          * 如果已经绑定好队列,则直接订阅
//          * 如果没有绑定好队列,则先临时缓存,等待队列绑定完毕,自动订阅
//          */
//         if (this.queues.has(queueName)) {
//             this.queues.get(queueName).queue.subscribe({ack: true}, callback).addCallback(ok => {
//                 this.queues.get(queueName).consumerTag = ok.consumerTag
//             })
//             this.awitSubscribes.delete(queueName)
//             console.log(queueName + '订阅成功')
//         } else if (!this.awitSubscribes.has(queueName)) {
//             this.awitSubscribes.set(queueName, callback)
//         }
//     }
//
//     startConnect() {
//         const amqp = require('amqp');
//         const {config, queues} = this;
//         const exchangeConfig = {type: 'topic', autoDelete: false, confirm: true, durable: true}
//         const connection = amqp.createConnection(config.connOptions, config.implOptions);
//         connection.on('ready', () => {
//             this.exchange = connection.exchange(config.exchange.name, exchangeConfig);
//             this.exchange.on('open', () => {
//                 config.queues.forEach(item => connection.queue(item.name, item.options, (queue) => {
//                     Array.isArray(item.routingKeys) && item.routingKeys.forEach(router => {
//                         queue.bind(router.exchange || config.exchange.name, router.routingKey)
//                     })
//                     if (!queues.has(item.name)) {
//                         queues.set(item.name, {queue, consumerTag: ""})
//                     }
//                     if (this._awaitSubscribes.has(item.name)) {
//                         this.subscribe(item.name, this._awaitSubscribes.get(item.name))
//                     }
//                 }))
//                 this.isReady = true;
//                 this.emit('ready')
//             })
//             this.exchange.on('basic-return', (args) => {
//                 console.log('消息发送失败,没有匹配的路由,option:{mandatory:true}设置才会出现此消息,否则默认忽略', args)
//             })
//         })
//     }
// }
//
// interface RabbitQueueInfo {
//     name: string;
//     options: {
//         autoDelete: boolean,
//         durable: boolean
//     }
//     routingKeys: RoutingKeyInfo[];
// }
//
// interface RoutingKeyInfo {
//     exchange: string;
//     routingKey: string;
// }
//
// interface IRabbitClient {
//     config: any;
//     isReady: boolean;
//     queues: Map<string, RabbitQueueInfo>;
// }
//
// export const createRabbitClientSingleton = (rabbitConfig: object) => {
//     let instance;
//     return function () {
//         if (!instance) {
//             instance = new RabbitClient(rabbitConfig);
//         }
//         return instance;
//     }
// }
