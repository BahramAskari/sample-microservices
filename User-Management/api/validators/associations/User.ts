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

export const userId_validate: ValidationRule = {
    type: "number",
    optional: false,
    convert: true,
    custom: async (value: any, errors, schema, name, parent, context) =>{
        if (isNaN(value)) throw new NotFoundError();
        const exists = await UserCheck.existsByField("id", value);
        if (!exists || isNaN(value)) throw new NotFoundError();
        return value;
    }
};
/**
 * Role
 */
const roleAdd: Partial< Record<"userId" | "roleId", ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    userId: userId_validate,
    roleId: {
        type: "number",
        optional: false,
        convert: true,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (
                isNaN(value)
                || !(await RoleCheck.existsById(value))
            ) throw new PartialErrors([{code: "addAssociation:NotExist", item: "User", association: "Role", id: Number(value)}]);
            return value;
        },
    },
}
const roleRemove: Partial< Record<"userId" | "roleId", ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    userId: userId_validate,
    roleId: {
        type: "number",
        optional: false,
        convert: true,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (
                isNaN(value)
                || !(await RoleCheck.existsById(value))
            ) throw new PartialErrors([{code: "removeAssociation:NotExist", item: "User", association: "Role", id: Number(value)}]);
            return value;
        },
    },
}
const rolesSchema: Partial< Record<"userId" | "ids", ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    userId: userId_validate,
    ids: idArray_required
}




export const validateUser_addRole = v.compile(roleAdd)
export const validateUser_removeRole = v.compile(roleRemove)
export const validateUser_relateRoles = v.compile(rolesSchema)