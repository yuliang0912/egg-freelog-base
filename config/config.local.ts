import {DefaultConfig} from './config.default';

export default () => {
    const config: DefaultConfig = {};

    config.gatewayUrl = "http://192.168.164.165:8895"

    return config;
};
