import Validator, {
    ValidationSchema,
    ValidationRuleObject,
    ValidationRule,
    ValidationError,
    Context
} from "fastest-validator"
//import {checkSlugExists} from "../../province"
import {validatorInstance} from "../index";
import {ProvinceDto_Create_Payload, ProvinceDto_Update_Payload} from "../../types/Dto/provinces";
import {isEmpty, isNil} from "lodash";
const v = validatorInstance

const provinceCreateSchema: Partial< Record<keyof ProvinceDto_Create_Payload, ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    name: {
        type: "string",
        // optional: false,
        min: 3,
        max: 100,
    }, slug: {
        type: "string",
        optional: false,
        nullable: false,
        empty: false,
        // min: 1,
        max: 100,
        custom: async (value, errors, schema, name, parent, context: Context) => {
            console.log(`Update Province: name is -> `, context)
            /*
            const isAvailable = await CityHandle.makeSlugByField(context);
            if (!isAvailable)
                errors.push({ type: "unique", actual: value, });
            return value;
             */
        }
    },
    /**
    CountryId: {
        type: "number",
        optional: false,
        custom: async (value, errors) => {
            const exists = await CountryCheck.existsByField("id", value);
            if (!exists)        // not exist
                errors.push({ type: "notTaken", actual: value, });
            return value;
        }
    },
     */
}


const ValidateProvinceCreate = v.compile(provinceCreateSchema)



export {
    ValidateProvinceCreate,
}

