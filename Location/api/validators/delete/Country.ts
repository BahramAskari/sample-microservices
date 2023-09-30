import Validator,{ValidationSchema, ValidationRuleObject,ValidationRule, ValidationError} from "fastest-validator"
import {validatorInstance} from "../index";
import {isEmpty, isNil} from "lodash";
import CountryCheck from "../../services/check/Country";
import {NotFoundError} from "../../errors";
const v = validatorInstance

const deleteSchema: Partial< Record<"id", ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    id: {
        type: "number",
        optional: false,
        convert: true,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (isNaN(value)) throw new NotFoundError();
            const exists = await CountryCheck.existsByField("id", value);
            if (!exists) throw new NotFoundError();
        }
    },
}






const validateCountry_delete = v.compile(deleteSchema)




export {
    validateCountry_delete,
}

