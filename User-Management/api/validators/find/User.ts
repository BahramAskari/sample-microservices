import Validator, {
    ValidationSchema,
    ValidationRuleObject,
    ValidationRule,
    ValidationError,
    Context
} from "fastest-validator"
import {validatorInstance} from "../index";
import {isArray, isEmpty, isNil, isNumber} from "lodash";
import UserCheck from "../../services/check/User";
import {NotFoundError} from "../../errors";
const v = validatorInstance

const findSchema: Record<"id", ValidationRule> = {
    // @ts-ignore
    $$async: true,
    id: {
        type: "number",
        optional: false,
        convert: true,
        custom: async (value, errors, schema, parent, context) => {
            if (isNaN(value)) throw new NotFoundError();
            const exists = await UserCheck.existsByField("id", value);
            if (!exists || isNaN(value)) throw new NotFoundError();
            return value;
        },

    },
}


const validateUser_find = v.compile(findSchema)




export {
    validateUser_find,
}

