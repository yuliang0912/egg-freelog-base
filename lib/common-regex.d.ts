declare const _default: {
    /**
     * hash-sha1值
     */
    sha1: RegExp;
    /**
     * 插件命名规则
     */
    widgetName: RegExp;
    /**
     * md5
     */
    md5: RegExp;
    /**
     * +86 地区移动手机号码
     */
    mobile86: RegExp;
    /**
     * email
     */
    email: RegExp;
    /**
     * mongodb-object-id
     */
    mongoObjectId: RegExp;
    /**
     * 逗号分隔的sha1
     */
    splitSha1: RegExp;
    /**
     * 逗号分隔的mongodbObjectId
     */
    splitMongoObjectId: RegExp;
    /**
     * 逗号分隔的md5
     */
    splitMd5: RegExp;
    /**
     * 逗号分隔的数字
     */
    splitNumber: RegExp;
    /**
     * 资源类型校验
     */
    resourceType: RegExp;
    /**
     * 节点短域名
     */
    nodeDomain: RegExp;
    /**
     * 节点名称(中文,英文,数字)
     */
    nodeName: RegExp;
    /**
     * 32位小写16进制
     */
    bit32Hex: RegExp;
    /**
     * 交易账户ID
     */
    transferAccountId: RegExp;
    /**
     * bucketName规则:只允许小写字母、数字、中划线（-），且不能以短横线开头或结尾.
     */
    bucketName: RegExp;
    /**
     * 严格模式的bucketName,只允许小写字母、数字、中划线（-），且不能以短横线开头或结尾
     */
    strictBucketName: RegExp;
    /**
     * 字母、数字、中划线（-）组成,且不能以短横线开头或结尾,1-30长度
     */
    username: RegExp;
    /**
     * 同commonNameFormat
     */
    resourceName: RegExp;
    /**
     * 密码格式,6-24位任意字符,组合中必须包含数字和字母
     */
    password: RegExp;
    /**
     * 发行全名规则,由username/resourceName组合而成
     */
    fullResourceName: RegExp;
    /**
     * 通用名称命名规则,(资源,mock,presentable统一)名称(不能包含\ / : * ? " < > |字符以及空格,长度1-60)
     */
    commonNameFormat: RegExp;
};
export default _default;
