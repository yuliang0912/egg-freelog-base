import {DefaultConfig} from './config.default';

export default () => {
    const config: DefaultConfig = {};

    config.gatewayUrl = "http://api-gateway-service.development:6895"

    return config;
};


