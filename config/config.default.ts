import {EggAppConfig, EggAppInfo, PowerPartial} from 'egg';
import {FreelogContext, ErrCodeEnum, RetCodeEnum} from '../index';
import {buildApiFormatData} from '../lib/freelog-common-func';

export interface FreelogFrameworkDefaultConfig {
    gatewayUrl: string;
    uploadConfig: {
        aliOss: {
            enable: boolean;
            [key: string]: any;
        };
        amzS3: {
            enable: boolean;
            [key: string]: any;
        }
    }
}

export type DefaultConfig = PowerPartial<EggAppConfig & FreelogFrameworkDefaultConfig>

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig> & FreelogFrameworkDefaultConfig;

    config.keys = appInfo.name;

    config.bodyParser = {
        enable: true,
        // @ts-ignore
        onerror: (err, ctx: FreelogContext) => {
            ctx.bodyParserError = err;
        }
    };

    config.onerror = {
        all(err, ctx) {
            ctx.type = 'application/json';
            ctx.body = buildApiFormatData(RetCodeEnum.success, ErrCodeEnum.autoSnapError, '未处理的异常', err.stack || err.toString());
        }
    };

    config.uploadConfig = {
        aliOss: {
            enable: false,
        },
        amzS3: {
            enable: false,
        }
    };

    config.gatewayUrl = 'https://api.freelog.com';

    return config;
};
