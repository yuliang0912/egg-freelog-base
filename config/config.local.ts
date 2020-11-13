import {EggAppConfig, PowerPartial} from 'egg';

export default () => {
    const config: PowerPartial<EggAppConfig> = {};

    config.gatewayUrl = "http://192.168.164.165:8895"

    return config;
};
