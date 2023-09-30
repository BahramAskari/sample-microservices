import Validator, {
    ValidationSchema,
    ValidationRuleObject,
    ValidationRule,
    ValidationError,
    Context
} from "fastest-validator"
import {validatorInstance} from "../index";
import {CountryDto_Update_Payload} from "../../types/Dto/countries";
import {isArray, isEmpty, isNil, isNumber} from "lodash";
import {NotFoundError} from "../../errors";
import CountryCheck from "../../services/check/Country";


const v = validatorInstance


const updateSchema: Partial< Record<keyof CountryDto_Update_Payload, ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    id: {
        type: "number",
        convert: true,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (isNaN(value)) throw new NotFoundError();
            const exists = await CountryCheck.existsByField("id", value);
            if (!exists) throw new NotFoundError()
            return value;
        }
    },
    name: {
        type: "string",
        // optional: false,
        min: 3,
        max: 100,
    }, phoneCode: {
        type: "number",
        convert: true,
        optional: false,
        nullable: false,
        empty: false,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            // @ts-ignore
            const exists = await CountryCheck.existsByFieldExceptItem("phoneCode", value, context.data.id);
            if (exists) errors.push({ type: "unique", field: "phoneCode", actual: value, });
            return value;
        }
    }, slug: {
        type: "string",
        optional: false,
        nullable: false,
        empty: false,
        // min: 1,
        max: 100,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            // @ts-ignore
            const exists = await CountryCheck.existsByFieldExceptItem("slug", value, context.data.id);
            if (exists)
                errors.push({ type: "unique", field: "slug", actual: value, });
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




const ValidateCountryUpdate = v.compile(updateSchema)



export {
    ValidateCountryUpdate,
}

