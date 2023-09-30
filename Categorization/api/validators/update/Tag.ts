import Validator, {
    ValidationRule,
    Context
} from "fastest-validator"
import {validatorInstance} from "../index";
import {TagDto_Update_Payload,} from "../../Types/Dto/tags";
import {NotFoundError} from "../../errors";
import TagCheck from "../../Services/check/Tag";
const v = validatorInstance


const updateSchema: Partial< Record<keyof TagDto_Update_Payload, ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    id: {
        type: "number",
        convert: true,
        custom: async (value, errors, schema, name, parent, context: Context) =>{
            if (isNaN(value)) throw new NotFoundError();
            const exists = await TagCheck.existsByField("id", value);
            if (!exists) throw new NotFoundError()
            return value;
        }
    },
    name: {
        type: "string",
        min: 3,
        max: 80,
    },
    slug: {
        type: "string",
        optional: true,
        nullable: true,
        min: 3,
        max: 150,
        custom: async (value, errors, schema, name, parent, context: Context) =>{
            // @ts-ignore
            const exists = await TagCheck.existsByFieldExceptItem("slug", value, context.data.id);
            if (exists) errors.push({ type: "unique", field: "slug", actual: value, });
            return value;
        }
    },
    description: {
        type: "string",
        nullable: true,
        min: 10,
        max: 400,
    },
}




const ValidateTagUpdate = v.compile(updateSchema)



export {
    ValidateTagUpdate,
}

