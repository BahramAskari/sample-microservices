import Validator,{ValidationSchema, ValidationRuleObject,ValidationRule, ValidationError} from "fastest-validator"
import {validatorInstance} from "../index";
import {RoleDto_Create_Payload, } from "../../types/Dto/roles";
import {isEmpty, isNil} from "lodash";
import RoleCheck from "../../services/check/Role";


const v = validatorInstance

const roleCreateSchema: Partial< Record<keyof RoleDto_Create_Payload, ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    name: {
        type: "string",
        // optional: false,
        min: 3,
        max: 80,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            const exists = await RoleCheck.existsByField("name", value);
            if (exists)        // not exist
                errors.push({ type: "unique", field: "name", actual: value, });
            return value;
        }
    }, description: {
        type: "string",
        optional: true,
        nullable: true,
        min: 20,
        //max: 100,
    },
}



const ValidateRoleCreate = v.compile(roleCreateSchema)



export {
    ValidateRoleCreate,
}

