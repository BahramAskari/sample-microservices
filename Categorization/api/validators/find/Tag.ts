import Validator,{ValidationSchema, ValidationRuleObject,ValidationRule, ValidationError} from "fastest-validator"
import {validatorInstance} from "../index";
import {isEmpty, isNil} from "lodash";
import TagCheck from "../../Services/check/Tag";
import {NotFoundError} from "../../errors";
const v = validatorInstance

const findSchema: Partial< Record<"id", ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    id: {
        type: "number",
        optional: false,
        convert: true,
        custom: async (value, errors) => {
            if (isNaN(value)) throw new NotFoundError();
            const exists = await TagCheck.existsByField("id", value);
            if (!exists) throw new NotFoundError();
        }
    },
}






const validateTag_find = v.compile(findSchema)




export {
    validateTag_find,
}

