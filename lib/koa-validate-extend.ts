import {ArgumentError, CommonRegex} from '../index';
import {isArray, isFunction, isObject, isString} from 'util';

module.exports = {

    /**
     * 此处修改覆盖源代码上的BUG.
     * 源代码上用!this.hasError() && !this.value判断 当this.value = 0或""时,则默认进入判断,导致错误出现
     * @param data
     * @returns {exports}
     */
    default(data) {
        if (!this.hasError() && this.value === undefined) {
            this.value = this.params[this.key] = data;
        }
        return this;
    },

    /**
     * 是否是sha1格式
     * @param tip
     * @returns {module.exports}
     */
    isSha1(tip) {
        if (this.goOn && !CommonRegex.sha1.test(this.value)) {
            this.addError(tip || this.key + ' is not sha1 format.');
        }
        return this;
    },

    /**
     * 是否是freelog定义的资源ID格式
     */
    isResourceId(tip) {
        return this.isMongoObjectId(tip || this.key + ' is not resourceId format.');
    },


    /**
     * 是否发行名(全名)
     * @param tip
     * @returns {exports}
     */
    isFullResourceName(tip) {
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
    isResourceType(tip) {
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
    isResourceName(tip) {
        if (this.goOn && !CommonRegex.commonNameFormat.test(this.value)) {
            this.addError(tip || this.key + ' is not resourceName format.');
        }
        return this;
    },

    /**
     * 是否是逗号分隔的resourceId
     * @param tip
     */
    isSplitResourceId(tip) {
        if (this.goOn && !CommonRegex.splitMongoObjectId.test(this.value)) {
            this.addError(tip || this.key + ' is not split resourceId format.');
        }
        return this;
    },

    /**
     * 是否是mongoDB-ObjectId
     * @param tip
     */
    isMongoObjectId(tip) {
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
    isContractId(tip) {
        return this.isMongoObjectId(tip || this.key + ' is not contractId format.');
    },

    /**
     * 是否是PresentableId
     * @param tip
     * @returns {*}
     */
    isPresentableId(tip) {
        return this.isMongoObjectId(tip || this.key + ' is not presentableId format.');
    },


    /**
     * presentable名称
     * @param tip
     * @returns {exports}
     */
    isPresentableName(tip) {
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
    isUsername(tip) {
        if (this.goOn && !CommonRegex.username.test(this.value)) {
            this.addError(tip || this.key + ' is not username format.');
        }
        return this;
    },

    /**
     * 是否是登录密码
     */
    isLoginPassword(tip) {
        if (this.goOn && !CommonRegex.password.test(this.value)) {
            this.addError(tip || this.key + ' is not password format.');
        }
        return this;
    },

    /**
     * 是否是事件ID
     * @param tip
     */
    isEventId(tip) {
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
    isBucketName(tip) {
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
    isStrictBucketName(tip) {
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
    isSplitMongoObjectId(tip) {
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
    isSplitMd5(tip) {
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
    isSplitSha1(tip) {
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
    isSplitNumber(tip) {
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
    isNodeDomain(tip) {
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
    isNodeName(tip) {
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
    isTransferAccountId(tip) {
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
    isMd5(tip) {
        if (this.goOn && !CommonRegex.md5.test(this.value)) {
            this.addError(tip || this.key + ' is not md5.');
        }
        return this;
    },

    /**
     * 是否数组
     * @param tip
     */
    isArray(tip) {
        if (this.goOn && !isArray(this.value)) {
            this.addError(tip || this.key + ' is not array.');
        }
        return this;
    },

    /**
     * 是否对象
     * @param tip
     */
    isObject(tip) {
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
    toSplitArray(tip, split = ',') {
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
    is(checkFunc, tip) {

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
    toVersionRange(tip) {
        this.isVersionRange(tip)
        if (this.goOn && !this.hasError()) {
            this.value = this.params[this.key] = require('semver').validRange(this.value)
        }
        return this;
    },

    /**
     * 是否范围版本
     * @param tip
     * @returns {exports}
     */
    isVersionRange(tip) {
        let semver = require('semver')
        if (this.goOn && semver.validRange(this.value) === null) {
            this.addError(tip || this.key + ' is not semver range version.');
        }
        return this;
    }
}
