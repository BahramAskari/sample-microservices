import Validator, {
    ValidationSchema,
    ValidationRuleObject,
    ValidationRule,
    ValidationError,
    Context
} from "fastest-validator"
import {idArray_required, validatorInstance} from "../index";
import {isArray, isEmpty, isNil, isNumber} from "lodash";
import UserCheck from "../../services/check/User";
import {NotFoundError, PartialErrors} from "../../errors";
import RoleCheck from "../../services/check/Role";


const v = validatorInstance

export const roleId_validate: ValidationRule = {
    type: "number",
    optional: false,
    convert: true,
    custom: async (value: any, errors, schema, name, parent, context) =>{
        if (isNaN(value)) throw new NotFoundError();
        const exists = await RoleCheck.existsByField("id", value);
        if (!exists || isNaN(value)) throw new NotFoundError();
        return value;
    }
};
/**
 * User
 */
const userAdd: Partial< Record<"roleId" | "userId", ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    roleId: roleId_validate,
    userId: {
        type: "number",
        optional: false,
        convert: true,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (
                isNaN(value)
                || !(await UserCheck.existsById(value))
            ) throw new PartialErrors([{code: "addAssociation:NotExist", item: "Role", association: "User", id: Number(value)}]);
            return value;
        },
    },
}
const userRemove: Partial< Record<"roleId" | "userId", ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    roleId: roleId_validate,
    userId: {
        type: "number",
        optional: false,
        convert: true,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (
                isNaN(value)
                || !(await UserCheck.existsById(value))
            ) throw new PartialErrors([{code: "removeAssociation:NotExist", item: "Role", association: "User", id: Number(value)}]);
            return value;
        },
    },
}
const usersSchema: Partial< Record<"roleId" | "ids", ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    roleId: roleId_validate,
    ids: idArray_required
}




const validateRole_addUser = v.compile(userAdd)
const validateRole_removeUser = v.compile(userRemove)
const validateRole_relateUsers = v.compile(usersSchema)




export {
    validateRole_addUser,
    validateRole_removeUser,
    validateRole_relateUsers,
}