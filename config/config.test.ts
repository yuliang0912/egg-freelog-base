import {EggAppConfig, PowerPartial} from 'egg';

export default () => {
    const config: PowerPartial<EggAppConfig> = {};

    config.gatewayUrl = "http://api-gateway-service.development:6895";

    return config;
};
