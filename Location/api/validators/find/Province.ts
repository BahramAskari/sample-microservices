import Validator,{ValidationSchema, ValidationRuleObject,ValidationRule, ValidationError} from "fastest-validator"
import {validatorInstance} from "../index";
import {isEmpty, isNil} from "lodash";
import ProvinceCheck from "../../services/check/Province";
import {NotFoundError} from "../../errors";
const v = validatorInstance

const findSchema: Partial< Record<"id", ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    id: {
        type: "number",
        optional: false,
        convert: true,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (isNaN(value)) throw new NotFoundError();
            const exists = await ProvinceCheck.existsByField("id", value);
            if (!exists) throw new NotFoundError();
        }
    },
}






const validateProvince_find = v.compile(findSchema)




export {
    validateProvince_find,
}

