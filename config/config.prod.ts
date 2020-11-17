import {DefaultConfig} from './config.default';

export default () => {
    const config: DefaultConfig = {};

    config.gatewayUrl = "http://api-gateway-service.production:8895"

    return config;
};

