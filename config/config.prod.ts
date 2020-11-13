import {EggAppConfig, PowerPartial} from 'egg';

export default () => {
    const config: PowerPartial<EggAppConfig> = {};

    config.gatewayUrl = "http://api-gateway-service.production:8895";

    return config;
};
