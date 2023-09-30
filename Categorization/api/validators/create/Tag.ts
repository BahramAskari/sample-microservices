import Validator,{ValidationSchema, ValidationRuleObject,ValidationRule, ValidationError} from "fastest-validator"
import {TagDto_Create_Payload} from "../../Types/Dto/tags";
import {validatorInstance} from "../index";
import TagCheck from "../../Services/check/Tag";


const v = validatorInstance

const tagCreateSchema: Record<keyof TagDto_Create_Payload, ValidationRule> = {
// @ts-ignore
    $$async: true,
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
        custom: async (value: any, errors , schema, name, parent, context) =>{
            console.log(`Tag Slug from user input field is -> `, value)
            // E.g. checking in the DB that the value is unique.
            const exists = await TagCheck.existsByField("slug", value);
            console.log(`Slug exists or not ? `, exists)
            if (exists) errors.push({ type: "unique", actual: value, });
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




const ValidateTagCreate = v.compile(tagCreateSchema)




export {
    ValidateTagCreate,
}

