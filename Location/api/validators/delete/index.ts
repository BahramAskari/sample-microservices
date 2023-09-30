import Validator,{ValidationSchema, ValidationRuleObject,ValidationRule, ValidationError} from "fastest-validator"
import {validatorInstance} from "../index";
import {isEmpty, isNil, isArray, isNumber} from "lodash";
const v = validatorInstance

const deleteManySchema: Partial< Record<"ids", ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    ids: {
        type: "array",
        optional: false,
        empty: false,
        convert: true,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (!isArray(value)) errors.push({ type: "array", field: "ids", actual: value, })
            // is array -> keep numeric ids
            return value.filter(val => isNumber(Number(val)) && !isNaN(Number(val)))
        }
    },
}



const validate_deleteMany = v.compile(deleteManySchema)

export {
    validate_deleteMany,
}