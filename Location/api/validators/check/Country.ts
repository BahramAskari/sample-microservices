import Validator, {
    ValidationSchema,
    ValidationRuleObject,
    ValidationRule,
    ValidationError,
    Context
} from "fastest-validator"
import {validatorInstance} from "../index";
import {isEmpty, isNil} from "lodash";
import {NotFoundError} from "../../errors";
import CountryCheck from "../../services/check/Country";
const v = validatorInstance



const checkCountrySlug: Partial< Record<"slug", ValidationRule> > = {
    // @ts-ignore
    $$async: true,
   slug: {
        type: "string",
        optional: false,
        nullable: false,
        empty: false,
        // min: 1,
        max: 80,
       custom: async (value: any, errors, schema, name, parent, context) =>{
            const exists = await CountryCheck.existsByField("slug", value);
            if (exists)
                errors.push({ type: "unique", field: "slug", actual: value, });
            return value;
        }
    },
}



const ValidateCountryCheckCountrySlug = v.compile(checkCountrySlug)




export {
    ValidateCountryCheckCountrySlug,
}

