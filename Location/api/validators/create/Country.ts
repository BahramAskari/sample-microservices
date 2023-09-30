import Validator,{ValidationSchema, ValidationRuleObject,ValidationRule, ValidationError} from "fastest-validator"
//import {checkSlugExists} from "../../country"
import {validatorInstance} from "../index";
import {CountryDto_Create_Payload, CountryDto_Update_Payload} from "../../types/Dto/countries";
import CountryCheck from "../../services/check/Country";


const v = validatorInstance

const countryCreateSchema: Partial< Record<keyof CountryDto_Create_Payload, ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    name: {
        type: "string",
        // optional: false,
        min: 3,
        max: 100,
    }, nativeName: {
        type: "string",
        optional: false,
        nullable: false,
        empty: false,
        // min: 1,
        max: 100,
    }, slug: {
        type: "string",
        optional: false,
        nullable: false,
        empty: false,
        // min: 1,
        max: 100,
        custom: async (value, errors) => {
            const exists = await CountryCheck.existsByField("slug", value);
            if (exists)
                errors.push({ type: "unique", actual: value, });
            return value;
        }
    },
    /*
  NationalLanguageId: {
        type: "number",
        optional: false,
        custom: async (value, errors) => {
            const exists = await LanguageCheck.existsByField("id", value);
            if (!exists)        // not exist
                errors.push({ type: "notTaken", actual: value, });
            return value;
        }
    },
     */

}


const ValidateCountryCreate = v.compile(countryCreateSchema)



export {
    ValidateCountryCreate,
}

