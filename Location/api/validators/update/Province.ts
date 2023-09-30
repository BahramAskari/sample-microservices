import Validator, {
    ValidationSchema,
    ValidationRuleObject,
    ValidationRule,
    ValidationError,
    Context
} from "fastest-validator"
import {validatorInstance} from "../index";
import {ProvinceDto_Update_Payload,} from "../../types/Dto/provinces";
import {isArray, isEmpty, isNil, isNumber} from "lodash";
import {NotFoundError} from "../../errors";
import ProvinceCheck from "../../services/check/Province";


const v = validatorInstance

const updateSchema: Partial< Record<keyof ProvinceDto_Update_Payload, ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    id: {
        type: "number",
        convert: true,
        custom: async (value, errors, schema, name, parent, context: Context) =>{
            if (isNaN(value)) throw new NotFoundError();
            const exists = await ProvinceCheck.existsByField("id", value);
            if (!exists) throw new NotFoundError()
            return value;
        }
    },
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
        min: 3,
        max: 100,
        custom: async (value, errors, schema, name, parent, context: Context) =>{
            // @ts-ignore
            const exists = await ProvinceCheck.existsByFieldExceptItem("slug", value, context.data.id);
            if (exists)
                errors.push({ type: "unique", field: "slug", actual: value, });
            return value;
        }
    },
    /*
    CountryId: {
        type: "number",
        optional: true,
        custom: async (value, errors) => {
            const exists = await ProvinceCheck.existsByField("id", value);
            if (!exists)        // not exist
                errors.push({ type: "notTaken", actual: value, });
            return value;
        }
    },
     */
}



const ValidateProvinceUpdate = v.compile(updateSchema)



export {
    ValidateProvinceUpdate,
}

