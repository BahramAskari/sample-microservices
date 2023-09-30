import Validator, {
    ValidationSchema,
    ValidationRuleObject,
    ValidationRule,
    ValidationError,
    Context
} from "fastest-validator"
import {validatorInstance} from "../index";
import {CityDto_Create_Payload, CityDto_Update_Payload} from "../../types/Dto/cities";
import {isEmpty, isNil} from "lodash";
import ProvinceCheck from "../../services/check/Province";
const v = validatorInstance

const cityCreateSchema: Partial< Record<keyof CityDto_Create_Payload, ValidationRule> > = {
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
            console.log(`Update City: name is -> `, context)
            /*
            const isAvailable = await CityHandle.makeSlugByField(context);
            if (!isAvailable)
                errors.push({ type: "unique", actual: value, });
            return value;
             */
        }
    },
    ProvinceId: {
        type: "number",
        optional: false,
        custom: async (value, errors) => {
            const exists = await ProvinceCheck.existsByField("id", value);
            if (!exists)        // not exist
                errors.push({ type: "notTaken", actual: value, });
            return value;
        }
    },
}



const ValidateCityCreate = v.compile(cityCreateSchema)




export {
    ValidateCityCreate,
}

