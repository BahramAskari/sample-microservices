import Validator,{ValidationSchema, ValidationRuleObject,ValidationRule, ValidationError} from "fastest-validator"
import {validatorInstance} from "../index";
import {isEmpty, isNil} from "lodash";
import CityCheck from "../../services/check/City";
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
            const exists = await CityCheck.existsByField("id", value);
            if (!exists) throw new NotFoundError();
        }
    },
}






const validateCity_find = v.compile(findSchema)




export {
    validateCity_find,
}

