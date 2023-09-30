import Validator, {
    ValidationSchema,
    ValidationRuleObject,
    ValidationRule,
    ValidationError,
    Context
} from "fastest-validator"
//import {checkSlugExists} from "../../role"
import {validatorInstance} from "../index";
import {RolesDto_UpdateMany_Payload, RoleDto_Update_Payload} from "../../types/Dto/roles";
import {isArray, isEmpty, isNil, isNumber} from "lodash";
import {NotFoundError} from "../../errors";
import RoleCheck from "../../services/check/Role";


const v = validatorInstance

const updateSchema: Partial< Record<keyof RoleDto_Update_Payload, ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    id: {
        type: "number",
        convert: true,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (isNaN(value)) throw new NotFoundError();
            const exists = await RoleCheck.existsByField("id", value);
            if (!exists)
                throw new NotFoundError()
        }
    },
    name: {
        type: "string",
        // optional: false,
        min: 3,
        max: 80,
        /*
        custom: async (value, errors, schema, name, parent, context: Context) =>{
            // @ts-ignore
            const exists = await RoleCheck.existsByFieldExceptItem("", value, context.data.id);
            if (exists)
                errors.push({ type: "unique", field: "name", actual: value, });
            return value;
        }
         */
    }, description: {
        type: "string",
        optional: true,
        nullable: true,
        min: 20,
        //max: 100,
    },
}



const updateManySchema: Partial< Record<keyof RolesDto_UpdateMany_Payload, ValidationRule> > = {
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
}




const ValidateRoleUpdate = v.compile(updateSchema)
const ValidateRoleUpdateMany = v.compile(updateManySchema)



export {
    ValidateRoleUpdate,
    ValidateRoleUpdateMany,
}

