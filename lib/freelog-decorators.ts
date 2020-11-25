import {FreelogContext, IdentityTypeEnum} from "../index";

/**
 * 访客身份认证与授权校验
 * @param identityType
 */
export function visitorIdentityValidatorDecorators(identityType: IdentityTypeEnum) {
    return (_target, _name, descriptor) => {
        const oldValue = descriptor.value;
        descriptor.value = function (ctx: FreelogContext) {
            ctx.validateVisitorIdentity(identityType);
            return oldValue.apply(this, arguments);
        };
        return descriptor;
    };
}
