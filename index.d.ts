import * as cryptoHelper from './lib/crypto-helper';
export * from './lib/framework';
export * from './lib/errors';
export * from './lib/enum';
export * from './lib/interface';
export * from './lib/jwt-helper';
export * from './lib/common-json-schema';
export * from './database/mongodb-operation';
export declare const CommonRegex: {
    sha1: RegExp;
    widgetName: RegExp;
    md5: RegExp;
    mobile86: RegExp;
    email: RegExp;
    mongoObjectId: RegExp;
    splitSha1: RegExp;
    splitMongoObjectId: RegExp;
    splitMd5: RegExp;
    splitNumber: RegExp;
    resourceType: RegExp;
    nodeDomain: RegExp;
    nodeName: RegExp;
    bit32Hex: RegExp;
    transferAccountId: RegExp;
    bucketName: RegExp;
    strictBucketName: RegExp;
    username: RegExp;
    resourceName: RegExp;
    password: RegExp;
    fullResourceName: RegExp;
    commonNameFormat: RegExp;
};
export declare const CryptoHelper: typeof cryptoHelper;