import Validator,{ValidationSchema, ValidationRuleObject,ValidationRule, ValidationError} from "fastest-validator"
import {validatorInstance} from "../index";
import {isEmpty, isNil} from "lodash";
import UserCheck from "../../services/check/User";
import {NotFoundError} from "../../errors";
const v = validatorInstance

const deleteSchema: Partial< Record<"id", ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    id: {
        type: "number",
        optional: false,
        convert: true,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (isNaN(value)) throw new NotFoundError();
            const exists = await UserCheck.existsByField("id", value);
            if (!exists) throw new NotFoundError();
        }
    },
}






const validateUser_delete = v.compile(deleteSchema)




export {
    validateUser_delete,
}

