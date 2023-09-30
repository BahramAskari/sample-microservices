import Validator, {
    ValidationSchema,
    ValidationRuleObject,
    ValidationRule,
    ValidationError,
    Context
} from "fastest-validator"
//import {checkSlugExists} from "../../user"
import {validatorInstance} from "../index";
import {UserDto_Create_Payload, UpdateMany_Users, UserDto_Update_Payload, UpdatePassword_User} from "../../types/Dto/users";
import {isArray, isEmpty, isNil, isNumber} from "lodash";
import {NotFoundError} from "../../errors";
import UserCheck from "../../services/check/User";


const v = validatorInstance

const updateSchema: Partial< Record<keyof UserDto_Update_Payload, ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    id: {
        type: "number",
        convert: true,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (isNaN(value)) throw new NotFoundError();
            const exists = await UserCheck.existsByField("id", value);
            if (!exists) throw new NotFoundError()
            return value;
        }
    },
    firstName: {
        type: "string",
        // optional: false,
        min: 3,
        max: 100,
    }, lastName: {
        type: "string",
        optional: false,
        nullable: false,
        empty: false,
        // min: 1,
        max: 100,
    },
    username: {
        type: "string",
        optional: false,
        nullable: false,
        empty: false,
        // min: 1,
        max: 100,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (!isNil(value)){
            // @ts-ignore
            const exists = await UserCheck.existsByFieldExceptItem("username", value, context.data.id);
            if (exists) errors.push({ type: "unique", field: "username", actual: value, });
            return value;
            }
        }
    }, email: {
        type: "email",
        optional: false,
        nullable: false,
        empty: false,
        // min: 1,
        max: 100,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (!isNil(value)){
            // @ts-ignore
            const exists = await UserCheck.existsByFieldExceptItem("email", value, context.data.id);
            if (exists) errors.push({ type: "unique", field: "email", actual: value, });
            return value;
            }
        }
    },
    phone: {
        type: "string",
        optional: true,
        nullable: true,
        empty: true, // stringEmpty: string like ""
        // min: 1,
        max: 11,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (!isNil(value)){
            if (!/^(09|9)+\d{9}$/.test(value)) errors.push({ type: "phone", field: "phone", actual: value });
            // @ts-ignore
            const exists = await UserCheck.existsByFieldExceptItem("phone", value, context.data.id);
            if (exists) errors.push({ type: "unique", field: "phone", actual: value, });
            return value;
            }
        }
    },
    sign: {type: "string", optional: true, nullable: true,},
    isVerified: {type: "boolean", convert: true, default: false,},
    is2FAEnabled: {type: "boolean", convert: true, default: false,},
}


const updatePasswordSchema: Partial< Record<keyof UpdatePassword_User, ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    id: {
        type: "number",
        convert: true,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (isNaN(value)) throw new NotFoundError();
            const exists = await UserCheck.existsByField("id", value);
            if (!exists) throw new NotFoundError()
            return value;
        }
    },
    password: { type: "string", min: 6, max: 120 },
}

const updateManySchema: Partial< Record<keyof UpdateMany_Users, ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    ids: {
        type: "array", /* items: "number", */ optional: false,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (!isArray(value)) errors.push({ type: "array", field: "ids", actual: value, })
            // is array -> keep numeric ids
            return value.filter(val => isNumber(Number(val)) && !isNaN(Number(val)))
        }
    },
    isVerified: {type: "boolean", optional: true, convert: true,},
    is2FAEnabled: {type: "boolean", optional: true, convert: true,},
}




const ValidateUserUpdate = v.compile(updateSchema)
const ValidateUserPasswordUpdate = v.compile(updatePasswordSchema)
const ValidateUserUpdateMany = v.compile(updateManySchema)



export {
    ValidateUserUpdate,
    ValidateUserPasswordUpdate,
    ValidateUserUpdateMany,
}

