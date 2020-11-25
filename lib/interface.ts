import {Stream} from "stream";
import {Context, Application} from 'egg';
import {ValidatorResult} from "jsonschema";
import {
    ErrCodeEnum, RetCodeEnum, SubjectAuthCodeEnum, SubjectTypeEnum,
    ApplicationErrorBase, CurlResFormatEnum
} from "../index";

/**
 *  freelog-api通用返回格式
 */
export interface IApiDataFormat {
    ret: RetCodeEnum;
    errCode: ErrCodeEnum;
    msg: string;
    data: object | string | number | any[] | null;
}

export interface FreelogUserInfo {
    [key: string]: any;

    userId: number;
    username: string;
}

export interface FreelogRequestIdentityInfo {
    [key: string]: any;

    userInfo?: FreelogUserInfo;
}

export interface FreelogApplication extends Application {

    webApi: IRestfulWebApi;

    /**
     * 每个项目都可以拓展koa-validate.目前framework已经拓展出了经常用到的.
     * 如果依然不能满足.则参考framework实现.自行拓展.然后挂到此对象中.
     * 框架启动时会自动合并
     */
    koaValidateExtend?: object;
}

export interface FreelogContext extends Context {

    app: FreelogApplication;

    /**
     * 用户ID
     */
    userId: number;

    /**
     * 请求接口的客户端ID,由gateway分配
     */
    clientId: number;

    /**
     * 此参数目前不解析.
     */
    nodeId: number;

    /**
     * 访客的身份信息,此处包含用户信息.请求客户端信息等
     */
    identityInfo: FreelogRequestIdentityInfo;

    /**
     * 内网其他服务的基础URL地址
     */
    webApi: IRestfulWebApi;

    /**
     * koa-validate校验过程中错误信息存储集合
     */
    errors: object[];

    /**
     * body-parser中间件onerror函数捕捉到错误时,会对该属性进行赋值
     */
    bodyParserError?: Error;

    /**
     * 响应成功的消息
     * @param data
     */
    success(data: any): FreelogContext;

    /**
     * 错误响应
     * @param errorInfo
     */
    error(errorInfo: ApplicationErrorBase | Error | string | undefined): void;

    /**
     * 校验参数是否包含错误.主要通过ctx.errors判定.如果有错误,直接抛出异常
     */
    validateParams(): FreelogContext;

    /**
     * 实体空值校验
     * @param entity
     * @param options
     */
    entityNullObjectCheck(entity: object | null, options?: { msg?: string, data?: any }): FreelogContext;

    /**
     * 实体空值判定,并且校验用户ID与实体的用户ID是否匹配
     * @param entity
     * @param options
     */
    entityNullValueAndUserAuthorizationCheck(entity: object | null, options?: { msg?: string, data?: any, property?: string }): FreelogContext

    /**
     * 校验访客身份认证与授权
     * @param identityType
     */
    validateVisitorIdentity(identityType: number): FreelogContext;

    /**
     * 内部httpClient调用
     * @param url
     * @param options
     * @param resFormat
     */
    curlIntranetApi(url: string, options?: object, resFormat?: CurlResFormatEnum): Promise<any>;

    /**
     * check POST body.,transFn see json-path.it will not use json path if transFn is false.
     * https://github.com/flitbit/json-path#more-power
     * @param fieldName
     * @param transFn
     */
    checkBody(fieldName: string, transFn?: any): IKoaValidate;

    /**
     * check GET query.,transFn see json-path.it will not use json path if transFn is false.
     * https://github.com/flitbit/json-path#more-power
     * @param fieldName
     * @param transFn
     */
    checkQuery(fieldName: string, transFn?: any): IKoaValidate;

    /**
     * check the params in the urls.
     * @param fieldName
     */
    checkParams(fieldName: string): IKoaValidate;

    /**
     * check the file object, if you use koa-body.this function will return FileValidator object. deleteOnCheckFailed default value is true
     * @param fieldName
     * @param deleteOnCheckFailed
     */
    checkFile(fieldName: string, deleteOnCheckFailed?: boolean): IKoaValidate;

    /**
     * check the params in the request http header.
     * @param fieldName
     */
    checkHeader(fieldName: string): IKoaValidate;
}

export interface IRestfulWebApi {
    /**
     * 用户信息
     */
    userInfo: string;

    /**
     * 交易账户信息
     */
    accountInfo: string;

    /**
     * 支付信息
     */
    pay: string;

    /**
     * 存储信息
     */
    storageInfo: string;

    /**
     * 策略信息-V2
     */
    policyInfoV2: string;

    /**
     * 节点信息-v2
     */
    nodeInfoV2: string;

    /**
     * 资源信息-v2
     */
    resourceInfoV2: string;

    /**
     *  展品信息-v2
     */
    presentableInfoV2: string;

    /**
     * 合约信息-V2
     */
    contractInfoV2: string;

    /**
     * 授权信息-V2
     */
    authInfoV2: string;
}

/**
 * JsonSchema校验基础接口
 */
export interface IJsonSchemaValidate {
    validate(instance: object[] | object, ...args): ValidatorResult;
}

/**
 * 对象存储接口
 */
export interface IObjectStorageService {

    client;
    serverProvider: 'aliOss' | 'amazonS3'

    /**
     * 以buffer的形式写入文件
     * @param objectName 对象名,存在路径就用/分隔
     * @param fileBuffer 文件buffer
     * @param options
     */
    putBuffer(objectName: string, fileBuffer: Buffer, options?: object): Promise<any>;

    /**
     * 以流的形式写入文件
     * @param objectName 对象名,存在路径就用/分隔
     * @param fileStream 文件流,一般指可读流
     * @param options
     */
    putStream(objectName: string, fileStream: Stream, options?: object): Promise<any>;

    /**
     * 获取文件流
     * @param objectName 对象名,存在路径就用/分隔
     */
    getStream(objectName: string): Promise<any>;

    /**
     * 删除对象
     * @param objectName 对象名,存在路径就用/分隔
     */
    deleteObject(objectName: string): Promise<any>;

    /**
     * 复制对象
     * @param toObjectName
     * @param fromObjectName
     * @param options
     */
    copyObject(toObjectName: string, fromObjectName: string, options?: object): Promise<any>;
}

export interface ISubjectAuthResult {

    /**
     * 做出本次授权结果判定的服务
     */
    referee: SubjectTypeEnum;

    /**
     * 标的物授权码
     */
    authCode: SubjectAuthCodeEnum;

    /**
     * 附加数据
     */
    data?: any;

    /**
     * 错误消息
     */
    errorMsg?: string;

    /**
     * 是否授权
     */
    isAuth: boolean;
}

/**
 * freelog-api通用分页数据格式
 */
export interface PageResult<T> {

    /**
     * 数据查询起点条数,类似于(page-1)*pageSize
     */
    skip: number;

    /**
     * 获取的数据数量,类似于pageSize
     */
    limit: number;

    /**
     * 总数量
     */
    totalItem: number;

    /**
     * 当前分页的数据集
     */
    dataList: T[];
}

/**
 * 自己拓展的校验函数
 */
export interface IKoaValidateExtend {

    /**
     * 是否忽略此参数.如果选择忽略参数.不管参数存不存在都不在校验和取值.就当不存在,取值为undefined
     * @param isIgnore 是否忽略此参数
     * @param tip isIgnore = false时的校验错误提示
     */
    isIgnore(this: IKoaValidate, isIgnore: boolean, tip?: string): IKoaValidate;

    /**
     * check if the param is a sha1 value.
     * @param tip
     */
    isSha1(tip?: string): IKoaValidate;

    /**
     * check if the param is a freelog resource Id
     * @param tip
     */
    isResourceId(tip?: string): IKoaValidate;

    /**
     * check if the param is a freelog resource full name
     * @param tip
     */
    isFullResourceName(tip?: string): IKoaValidate;

    /**
     * check if the param is a freelog resource type
     * @param tip
     */
    isResourceType(tip?: string): IKoaValidate;

    /**
     * check if the param is a freelog resource short name
     * @param tip
     */
    isResourceName(tip?: string): IKoaValidate;

    /**
     * check if the param is a comma-separated resource id string
     * @param tip
     */
    isSplitResourceId(tip?: string): IKoaValidate;

    /**
     * check if the param is a mongodb object id
     * @param tip
     */
    isMongoObjectId(tip?: string): IKoaValidate;

    /**
     * check if the param is a freelog contract Id
     * @param tip
     */
    isContractId(tip?: string): IKoaValidate;

    /**
     * check if the param is a presentable Id
     * @param tip
     */
    isPresentableId(tip?: string): IKoaValidate;

    /**
     * check if the param is a freelog presentable short name
     * @param tip
     */
    isPresentableName(tip?: string): IKoaValidate;

    /**
     *  check if the param is a freelog username
     * @param tip
     */
    isUsername(tip?: string): IKoaValidate;

    /**
     *  check if the param is a freelog login password
     * @param tip
     */
    isLoginPassword(tip?: string): IKoaValidate;

    /**
     * check if the param is a freelog contract event Id
     * @param tip
     */
    isContractEventId(tip?: string): IKoaValidate;

    /**
     * bucketName规则:只允许小写字母、数字、中划线（-），且不能以短横线开头或结尾. 或者系统支持的bucket,例如.UserNodeData
     * @param tip
     */
    isBucketName(tip?: string): IKoaValidate;

    /**
     * 严格模式的bucketName,只允许小写字母、数字、中划线（-），且不能以短横线开头或结尾
     * @param tip
     */
    isStrictBucketName(tip?: string): IKoaValidate;

    /**
     * 逗号分隔的mongodb object id
     * @param tip
     */
    isSplitMongoObjectId(tip?: string): IKoaValidate;

    /**
     * 逗号分隔的md5字符串
     * @param tip
     */
    isSplitMd5(tip?: string): IKoaValidate;

    /**
     * 逗号分隔的sha1字符串
     * @param tip
     */
    isSplitSha1(tip?: string): IKoaValidate;

    /**
     * 逗号分隔的数字
     * @param tip
     */
    isSplitNumber(tip?: string): IKoaValidate;

    /**
     * 是否是节点域名
     * @param tip
     */
    isNodeDomain(tip?: string): IKoaValidate;

    /**
     * 是否是节点名称
     * @param tip
     */
    isNodeName(tip?: string): IKoaValidate;

    /**
     * 是否是飞致网络交易账号ID
     * @param tip
     */
    isTransferAccountId(tip?: string): IKoaValidate;

    /**
     * 是否是md5
     * @param tip
     */
    isMd5(tip?: string): IKoaValidate;

    /**
     * 是否是数组
     * @param tip
     */
    isArray(tip?: string): IKoaValidate;

    /**
     * 是否是对象,toString.call = '[object Object]'
     * @param tip
     */
    isObject(tip?: string): IKoaValidate;

    /**
     * 把逗号分隔的字符串转换为数组
     * @param tip
     * @param split
     */
    toSplitArray(tip?: string, split?: string): IKoaValidate;

    /**
     * 自定义校验函数
     * @param checkFunc
     * @param tip
     */
    is(checkFunc: any, tip?: string): IKoaValidate;

    /**
     * 转换为semver范围版本
     * @param tip
     */
    toVersionRange(tip?: string): IKoaValidate;

    /**
     * 是否是semver范围版本
     * @param tip
     */
    isVersionRange(tip?: string): IKoaValidate;

    /**
     * 字符串转换为排序对象,例如input "createDate:-1" => output {createDate:-1}
     * @param tip
     */
    toSortObject(this: IKoaValidate, tip?: string): IKoaValidate;
}

/**
 * 根据koa-validate手动单独提取的函数.
 * PS:koa-validate目前没有提供ts版本的,所以接口是根据源码自行提取的
 */
export interface IKoaValidate extends IKoaValidateExtend {
    /**
     * 请求上下文
     */
    context: FreelogContext;

    /**
     * 参数名称
     */
    key: string;

    /**
     * 参数值
     */
    value: any;

    /**
     * 是否存在参数
     */
    exists: boolean;

    /**
     * 请求的全部参数数据
     */
    params: object;

    /**
     * 验证链路是否继续
     */
    goOn: boolean;

    /**
     * 新增一个错误
     * @param tip
     */
    addError(tip: string): void;

    /**
     * 是否有错误
     */
    hasError(): boolean;

    /**
     *  the param may not in the params.if the param not exists,it has no error,no matter whether have other checker or not.
     */
    optional(): IKoaValidate;

    /**
     * check if the param is not empty.
     * @param tip
     */
    notEmpty(tip?: string): IKoaValidate;

    /**
     * the params can be a empty string.
     */
    empty(): IKoaValidate;

    /**
     * 不为空字符串
     * @param tip
     */
    notBlank(tip?: string): IKoaValidate;

    /**
     * 参数必须存在
     * @param tip
     */
    exist(tip?: string): IKoaValidate;

    /**
     * pattern must be a RegExp instance ,eg. /abc/i
     * @param pattern
     * @param tip
     */
    match(pattern: RegExp, tip?: string): IKoaValidate;

    /**
     * pattern must be a RegExp instance ,eg. /xyz/i
     * @param pattern
     * @param tip
     */
    notMatch(pattern: RegExp, tip?: string): IKoaValidate;

    /**
     * check if the param is integer.
     * @param tip
     * @param options
     */
    isInt(tip?: string, options?: object): IKoaValidate;

    /**
     * check if the param is float.
     * @param tip
     * @param options
     */
    isFloat(tip?: string, options?: object): IKoaValidate;

    /**
     * the abbreviation of isLength.
     * @param min
     * @param max
     * @param tip
     */
    isLength(min: number, max?: number, tip?: string): IKoaValidate;

    /**
     * the abbreviation of isLength.
     * @param min
     * @param max
     * @param tip
     */
    len(min: number, max?: number, tip?: string): IKoaValidate;

    /**
     * the abbreviation of isIn.
     * @param array
     * @param tip
     */
    in(array: any[], tip?: string): IKoaValidate;

    /**
     *  check if the param is in the array.
     * @param array
     * @param tip
     */
    isIn(array: any[], tip?: string): IKoaValidate;

    /**
     * check if the param equal to the value.
     * @param value
     * @param tip
     */
    eq(value: any, tip?: string): IKoaValidate;

    /**
     * check if the param not equal to the value.
     * @param value
     * @param tip
     */
    neq(value: any, tip?: string): IKoaValidate;

    /**
     *  check if the param great then the value.
     * @param num
     * @param tip
     */
    gt(num: number, tip?: string): IKoaValidate;

    /**
     * check if the param less then the value.
     * @param num
     * @param tip
     */
    lt(num: number, tip?: string): IKoaValidate;

    /**
     *  check if the param great then or equal the value.
     * @param num
     * @param tip
     */
    ge(num: number, tip?: string): IKoaValidate;

    /**
     * check if the param less then or equal the value.
     * @param num
     * @param tip
     */
    le(num: number, tip?: string): IKoaValidate;

    /**
     * check if the param contains the str.
     * @param str
     * @param tip
     */
    contains(str: string, tip?: string): IKoaValidate;

    /**
     * check if the param not contains the str.
     * @param str
     * @param tip
     */
    notContains(str: string, tip?: string): IKoaValidate;

    /**
     * check if the param is an email.
     * @param tip
     * @param options
     */
    isEmail(tip?: string, options?: object): IKoaValidate;

    /**
     * 是否URL
     * @param tip
     * @param options
     */
    isUrl(tip?: string, options?: object): IKoaValidate;

    /**
     * is ip4 or ip6
     * @param tip
     * @param version
     */
    isIP(tip?: string, version?: 4 | 6): IKoaValidate;

    /**
     * check if the param contains only letters (a-zA-Z).
     */
    isAlpha(tip?: string, locale?: string): IKoaValidate;

    /**
     *  check if the param contains only numbers.
     * @param tip
     */
    isNumeric(tip?: string): IKoaValidate;

    /**
     * check if the param contains only letters and numbers.
     * @param tip
     * @param locale
     */
    isAlphanumeric(tip?: string, locale?: string): IKoaValidate;

    /**
     * check if a param is base64 encoded.
     * @param tip
     */
    isBase64(tip?: string): IKoaValidate;

    /**
     * check if the param is a hexadecimal number.
     * @param tip
     */
    isHexadecimal(tip?: string): IKoaValidate;

    /**
     *check if the param is a hexadecimal color.
     * @param tip
     */
    isHexColor(tip?: string): IKoaValidate;

    /**
     *  check if the param is lowercase.
     * @param tip
     */
    isLowercase(tip?: string): IKoaValidate;

    /**
     * check if the param is uppercase.
     * @param tip
     */
    isUppercase(tip?: string): IKoaValidate;

    /**
     * check if the param is a number that's divisible by another.
     * @param num
     * @param tip
     */
    isDivisibleBy(num: number, tip?: string): IKoaValidate;

    /**
     * check if the param is null.
     * @param tip
     */
    isNull(tip?: string): IKoaValidate;

    /**
     * check if the param's length (in bytes) falls in a range.
     * @param min
     * @param max
     * @param tip
     */
    isByteLength(min: number, max: number, tip?: string): IKoaValidate;

    /**
     * the abbreviation of isByteLength.
     * @param min
     * @param max
     * @param tip
     */
    byteLength(min, max, tip?: string): IKoaValidate;

    /**
     * check if the param is a UUID (version 3, 4 or 5).
     * @param tip
     * @param version
     */
    isUUID(tip?: string, version?: 3 | 4 | 5): IKoaValidate;

    /**
     * check if the param is a date.
     * @param tip
     */
    isDate(tip?: string): IKoaValidate;

    /**
     * check if the param is a date that's after the specified date.
     * @param date
     * @param tip
     */
    isAfter(date, tip?: string): IKoaValidate;

    /**
     * check if the param is a date that's before the specified date.
     * @param date
     * @param tip
     */
    isBefore(date, tip?: string): IKoaValidate;

    /**
     * check if the param is a credit card.
     * @param tip
     */
    isCreditCard(tip?: string): IKoaValidate;

    /**
     * check if the param is an ISBN (version 10 or 13).
     * @param tip
     * @param version
     */
    isISBN(tip?: string, version?: number): IKoaValidate;

    /**
     * check if the param is valid JSON (note: uses JSON.parse).
     * @param tip
     */
    isJSON(tip?: string): IKoaValidate;

    /**
     * check if the param contains one or more multibyte chars.
     * @param tip
     */
    isMultibyte(tip?: string): IKoaValidate;

    /**
     *  check if the param contains ASCII chars only
     * @param tip
     */
    isAscii(tip?: string): IKoaValidate;

    /**
     * check if the param contains any full-width chars.
     * @param tip
     */
    isFullWidth(tip?: string): IKoaValidate;

    /**
     * check if the param contains any half-width chars.
     * @param tip
     */
    isHalfWidth(tip?: string): IKoaValidate;

    /**
     * check if the param contains a mixture of full and half-width chars
     * @param tip
     */
    isVariableWidth(tip?: string): IKoaValidate;

    /**
     * check if the param contains any surrogate pairs chars.
     * @param tip
     */
    isSurrogatePair(tip?: string): IKoaValidate;

    /**
     * check if the param is a currency
     * @param tip
     * @param options
     */
    isCurrency(tip?: string, options?: object): IKoaValidate;

    /**
     *  check if the param is a data uri.
     * @param tip
     */
    isDataURI(tip?: string): IKoaValidate;

    /**
     *  check if the param is a mobile phone
     * @param tip
     * @param locale
     */
    isMobilePhone(tip?: string, locale?: string): IKoaValidate;

    /**
     * check if the param is a ISO8601 string. eg.2004-05-03
     * @param tip
     */
    isISO8601(tip?: string): IKoaValidate;

    /**
     * check if the param is a MAC address.eg.C8:3A:35:CC:ED:80
     * @param tip
     */
    isMACAddress(tip?: string): IKoaValidate;

    /**
     * check if the param is a ISIN.
     * @param tip
     */
    isISIN(tip?: string): IKoaValidate;

    /**
     * check if the param is a fully qualified domain name. eg.www.google.com
     * @param tip
     * @param options
     */
    isFQDN(tip?: string, options?: object): IKoaValidate;

    /**
     * if the param not exits or is an empty string, it will take the default value.
     * @param value
     */
    default(value): IKoaValidate;

    /**
     * convert param to js Date object.
     */
    toDate(): IKoaValidate;

    /**
     * convert param to integer.radix for toInt,options for isInt
     * @param tip
     * @param radix
     * @param options
     */
    toInt(tip?: string, radix?: number, options?: object): IKoaValidate;

    /**
     * convert param to float.
     * @param tip
     */
    toFloat(tip?: string): IKoaValidate;

    /**
     * convert param to lowercase.
     */
    toLowercase(): IKoaValidate;

    /**
     * same as toLowercase.
     */
    toLow(): IKoaValidate;

    /**
     * convert param to uppercase.
     */
    toUppercase(): IKoaValidate;

    /**
     * same as toUppercase.
     */
    toUp(): IKoaValidate;

    /**
     * convert the param to a boolean. Everything except for '0', 'false' and '' returns true. In strict mode only '1' and 'true' return true.
     */
    toBoolean(): IKoaValidate;

    /**
     * convert param to json object.
     * @param tip
     */
    toJson(tip?: string): IKoaValidate;

    /**
     * trim characters (whitespace by default) from both sides of the param.
     * @param chars
     */
    trim(chars?: string): IKoaValidate;

    /**
     * trim characters from the left-side of the param.
     * @param chars
     */
    ltrim(chars?: string): IKoaValidate;

    /**
     * trim characters from the right-side of the param.
     * @param chars
     */
    rtrim(chars?: string): IKoaValidate;

    /**
     * replace <, >, & and " with HTML entities.
     */
    escape(): IKoaValidate;

    /**
     * remove characters with a numerical value < 32 and 127, mostly control characters.
     */
    stripLow(): IKoaValidate;

    /**
     * remove characters that do not appear in the whitelist.
     * @param value
     */
    whitelist(value: string): IKoaValidate;

    /**
     * remove characters that appear in the blacklist.
     * @param value
     */
    blacklist(value: string): IKoaValidate;

    /**
     * ref mdn encodeURI
     */
    encodeURI(): IKoaValidate;

    /**
     *  ref mdn decodeURI
     * @param tip
     */
    decodeURI(tip?: string): IKoaValidate;

    /**
     * ref mdn encodeURIComponent
     */
    encodeURIComponent(): IKoaValidate;

    /**
     * 是否是指定类型
     * @param type
     * @param tip
     */
    type(type: 'boolean' | 'string' | 'number' | 'object' | 'undefined' | 'array' | 'date' | 'null' | 'nullorundefined' | 'primitive', tip?: string): IKoaValidate;

    /**
     *  ref mdn decodeURIComponent
     * @param tip
     */
    decodeURIComponent(tip?: string): IKoaValidate;

    /**
     * the same as String replace
     * @param regOrStr
     * @param newRegOrFunc
     */
    replace(regOrStr: RegExp | string, newRegOrFunc: RegExp | any): IKoaValidate;

    /**
     *  clone current value to the new key, if newValue supplied , use it. eg. this.checkBody('v1').clone('md5').md5(); then your can use this.request.body.md5.
     * @param newKey
     * @param newValue
     */
    clone(newKey: string, newValue?: string): IKoaValidate;

    /**
     * encode current value to base64 string.
     */
    encodeBase64(): IKoaValidate;

    /**
     * - decode current base64 to a normal string,if inBuffer is true , the value will be a Buffer.
     * @param inBuffer
     * @param tip
     */
    decodeBase64(inBuffer?: boolean, tip?: string): IKoaValidate;

    /**
     * hash current value use specified algorithm and encoding(if supplied , default is 'hex'). ref hash
     * https://nodejs.org/api/crypto.html#crypto_class_hash
     * @param algorithm
     * @param encoding
     */
    hash(algorithm: string, encoding?: string): IKoaValidate;

    /**
     * md5 current value into hex string.
     */
    md5(): IKoaValidate;

    /**
     * sha1 current value into hex string.
     */
    sha1(): IKoaValidate;

    /**
     * limit the file size.
     * @param min
     * @param max
     * @param tip
     */
    size(min: number, max: number, tip?: string): IKoaValidate;

    /**
     * check the file's contentType with regular expression.
     * @param reg
     * @param tip
     */
    contentTypeMatch(reg: RegExp, tip?: string): IKoaValidate;

    /**
     * check the file's contentType if is image content type.
     * @param tip
     */
    isImageContentType(tip?: string): IKoaValidate;

    /**
     * check the file's name with regular expression.
     * @param reg
     * @param tip
     */
    fileNameMatch(reg: RegExp, tip?: string): IKoaValidate;

    /**
     * check the suffix of file's if in specified arr. arr eg. ['png','jpg']
     * @param arr
     * @param tip
     */
    suffixIn(arr: string[], tip?: string): IKoaValidate;

    /**
     * this.checkFile('file').notEmpty().delete
     * delete upload file.
     */
    delete(): IKoaValidate;
}


