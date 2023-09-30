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
import ProvinceCheck from "../../services/check/Province";
const v = validatorInstance



const checkProvinceSlug: Partial< Record<"slug", ValidationRule> > = {
    // @ts-ignore
    $$async: true,
   slug: {
        type: "string",
        optional: false,
        nullable: false,
        empty: false,
        // min: 1,
        max: 80,
        custom: async (value, errors) => {
            const exists = await ProvinceCheck.existsByField("slug", value);
            if (exists)
                errors.push({ type: "unique", field: "slug", actual: value, });
            return value;
        }
    },
}


const ValidateProvinceCheckProvinceSlug = v.compile(checkProvinceSlug)




export {
    ValidateProvinceCheckProvinceSlug,
}

