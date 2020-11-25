import {ArgumentError, CommonRegex, IKoaValidate} from '../index';
import {isArray, isFunction, isObject, isString} from 'util';

export default {

    /**
     * 此处修改覆盖源代码上的BUG.
     * 源代码上用!this.hasError() && !this.value判断 当this.value = 0或""时,则默认进入判断,导致错误出现
     * @param data
     * @returns {exports}
     */
    default(this: IKoaValidate, data: any) {
        if (!this.hasError() && this.value === undefined) {
            this.value = this.params[this.key] = data;
        }
        return this;
    },

    /**
     * 是否忽略此参数.如果选择忽略参数.不管参数存不存在都不在校验和取值.就当不存在,取值为undefined
     * @param isIgnore
     */
    isIgnore(this: IKoaValidate, isIgnore: boolean, tip?: string) {
        if (isIgnore) {
            this.goOn = false;
            this.value = undefined;
            return this;
        }
        return this.exist(tip);
    },

    /**
     * 是否是sha1格式
     * @param tip
     * @returns {module.exports}
     */
    isSha1(this: IKoaValidate, tip?: string) {
        if (this.goOn && !CommonRegex.sha1.test(this.value)) {
            this.addError(tip || this.key + ' is not sha1 format.');
        }
        return this;
    },

    /**
     * 是否是freelog定义的资源ID格式
     */
    isResourceId(this: IKoaValidate, tip?: string) {
        return this.isMongoObjectId(tip || this.key + ' is not resourceId format.');
    },


    /**
     * 是否发行名(全名)
     * @param tip
     * @returns {exports}
     */
    isFullResourceName(this: IKoaValidate, tip?: string) {
        if (this.goOn && !CommonRegex.fullResourceName.test(this.value)) {
            this.addError(tip || this.key + ' is not fullResourceName format.');
        }
        return this;
    },


    /**
     * resourceType命名规则
     * @param tip
     * @returns {exports}
     */
    isResourceType(this: IKoaValidate, tip?: string) {
        if (this.goOn && !CommonRegex.resourceType.test(this.value)) {
            this.addError(tip || this.key + ' is not resourceType format.');
        }
        return this;
    },

    /**
     * 资源名格式
     * @param tip
     * @returns {exports}
     */
    isResourceName(this: IKoaValidate, tip?: string) {
        if (this.goOn && !CommonRegex.commonNameFormat.test(this.value)) {
            this.addError(tip || this.key + ' is not resourceName format.');
        }
        return this;
    },

    /**
     * 是否是逗号分隔的resourceId
     * @param tip
     */
    isSplitResourceId(this: IKoaValidate, tip?: string) {
        if (this.goOn && !CommonRegex.splitMongoObjectId.test(this.value)) {
            this.addError(tip || this.key + ' is not split resourceId format.');
        }
        return this;
    },

    /**
     * 是否是mongoDB-ObjectId
     * @param tip
     */
    isMongoObjectId(this: IKoaValidate, tip?: string) {
        if (this.goOn && !CommonRegex.mongoObjectId.test(this.value)) {
            this.addError(tip || this.key + ' is error format.');
        }
        return this;
    },

    /**
     * 是否是合同ID
     * @param tip
     * @returns {*}
     */
    isContractId(this: IKoaValidate, tip?: string) {
        return this.isMongoObjectId(tip || this.key + ' is not contractId format.');
    },

    /**
     * 是否是PresentableId
     * @param tip
     * @returns {*}
     */
    isPresentableId(this: IKoaValidate, tip?: string) {
        return this.isMongoObjectId(tip || this.key + ' is not presentableId format.');
    },


    /**
     * presentable名称
     * @param tip
     * @returns {exports}
     */
    isPresentableName(this: IKoaValidate, tip?: string) {
        if (this.goOn && !CommonRegex.commonNameFormat.test(this.value)) {
            this.addError(tip || this.key + ' is not presentableName format.');
        }
        return this;
    },

    /**
     * 是否是用户名格式
     * @param tip
     * @returns {exports}
     */
    isUsername(this: IKoaValidate, tip?: string) {
        if (this.goOn && !CommonRegex.username.test(this.value)) {
            this.addError(tip || this.key + ' is not username format.');
        }
        return this;
    },

    /**
     * 是否是登录密码
     */
    isLoginPassword(this: IKoaValidate, tip?: string) {
        if (this.goOn && !CommonRegex.password.test(this.value)) {
            this.addError(tip || this.key + ' is not password format.');
        }
        return this;
    },

    /**
     * 是否是事件ID
     * @param tip
     */
    isContractEventId(this: IKoaValidate, tip?: string) {
        if (this.goOn && !CommonRegex.bit32Hex.test(this.value)) {
            this.addError(tip || this.key + ' is not eventId format.');
        }
        return this;
    },

    /**
     * 是否bucketName
     * @param tip
     * @returns {exports}
     */
    isBucketName(this: IKoaValidate, tip?: string) {
        if (this.goOn && !CommonRegex.bucketName.test(this.value)) {
            this.addError(tip || this.key + ' is not bucket name format.');
        }
        return this;
    },

    /**
     * 是否严格模式的bucketName
     * @param tip
     * @returns {exports}
     */
    isStrictBucketName(this: IKoaValidate, tip?: string) {
        if (this.goOn && !CommonRegex.strictBucketName.test(this.value)) {
            this.addError(tip || this.key + ' is not bucket name format.');
        }
        return this;
    },

    /**
     * 是否是分割的mongo-object-Id
     * @param tip
     * @returns {exports}
     */
    isSplitMongoObjectId(this: IKoaValidate, tip?: string) {
        if (this.goOn && !CommonRegex.splitMongoObjectId.test(this.value)) {
            this.addError(tip || this.key + ' is not split id format.');
        }
        return this;
    },

    /**
     * 是否是分割的md5
     * @param tip
     * @returns {exports}
     */
    isSplitMd5(this: IKoaValidate, tip?: string) {
        if (this.goOn && !CommonRegex.splitMd5.test(this.value)) {
            this.addError(tip || this.key + ' is not split id format.');
        }
        return this;
    },

    /**
     * 是否是分隔的sha1格式
     * @param tip
     * @returns {module.exports}
     */
    isSplitSha1(this: IKoaValidate, tip?: string) {
        if (this.goOn && !CommonRegex.splitSha1.test(this.value)) {
            this.addError(tip || this.key + ' is not split id format.');
        }
        return this;
    },

    /**
     * 是否是分割的数字
     * @param tip
     * @returns {exports}
     */
    isSplitNumber(this: IKoaValidate, tip?: string) {
        if (this.goOn && !CommonRegex.splitNumber.test(this.value)) {
            this.addError(tip || this.key + ' is not split number format.');
        }
        return this;
    },

    /**
     * 节点短域名格式
     * @param tip
     * @returns {exports}
     */
    isNodeDomain(this: IKoaValidate, tip?: string) {
        if (this.goOn && !CommonRegex.nodeDomain.test(this.value)) {
            this.addError(tip || this.key + ' is error format.');
        }
        return this;
    },

    /**
     * 节点名格式验证
     * @param tip
     * @returns {exports}
     */
    isNodeName(this: IKoaValidate, tip?: string) {
        if (this.goOn && !CommonRegex.nodeName.test(this.value)) {
            this.addError(tip || this.key + ' is error format.');
        }
        return this;
    },

    /**
     * 是否是交易账户
     * @param tip
     * @returns {exports}
     */
    isTransferAccountId(this: IKoaValidate, tip?: string) {
        if (this.goOn && !CommonRegex.transferAccountId.test(this.value)) {
            this.addError(tip || this.key + ' is not account format.');
        }
        return this;
    },


    /**
     * md5格式校验
     * @param tip
     * @returns {exports}
     */
    isMd5(this: IKoaValidate, tip?: string) {
        if (this.goOn && !CommonRegex.md5.test(this.value)) {
            this.addError(tip || this.key + ' is not md5.');
        }
        return this;
    },

    /**
     * 是否数组
     * @param tip
     */
    isArray(this: IKoaValidate, tip?: string) {
        if (this.goOn && !isArray(this.value)) {
            this.addError(tip || this.key + ' is not array.');
        }
        return this;
    },

    /**
     * 是否对象
     * @param tip
     */
    isObject(this: IKoaValidate, tip?: string) {
        if (this.goOn && !isObject(this.value)) {
            this.addError(tip || this.key + ' is not object.');
        }
        return this;
    },

    /**
     * 把字符串切割成数组
     * @param tip
     * @param split
     */
    toSplitArray(this: IKoaValidate, tip?: string, split = ',') {
        if (this.goOn && !this.hasError()) {
            if (!isString(this.value)) {
                this.addError(tip || this.key + ' is not string.');
            } else {
                this.value = this.params[this.key] = this.value.split(split)
            }
        }
        return this;
    },

    /**
     * 自定义函数校验
     * @param checkFunc
     * @param tip
     */
    is(this: IKoaValidate, checkFunc: any, tip?: string) {

        if (!isFunction(checkFunc)) {
            throw new ArgumentError('first argument must be function')
        }
        if (this.goOn && !checkFunc(this.value)) {
            this.addError(tip || this.key + ' validate failed.');
        }
        return this;
    },

    /**
     * 转换范围版本
     */
    toVersionRange(this: IKoaValidate, tip?: string) {
        this.isVersionRange(tip)
        if (this.goOn && !this.hasError()) {
            this.value = this.params[this.key] = require('semver').validRange(this.value)
        }
        return this;
    },

    /**
     * 字符串转换为排序对象,例如input "createDate:-1" => output {createDate:-1}
     * @param tip
     */
    toSortObject(this: IKoaValidate, tip?: string) {
        if (this.goOn && !this.hasError()) {
            if (!CommonRegex.pageSortString.test(this.value)) {
                this.addError(tip || this.key + ' is not sort format string.');
            } else {
                const [field, sortType] = this.value.split(':');
                this.value = this.params[this.key] = {[field]: parseInt(sortType)};
            }
        }
        return this;
    },

    /**
     * 是否范围版本
     * @param tip
     * @returns {exports}
     */
    isVersionRange(this: IKoaValidate, tip?: string) {
        let semver = require('semver')
        if (this.goOn && semver.validRange(this.value) === null) {
            this.addError(tip || this.key + ' is not semver range version.');
        }
        return this;
    }
}
