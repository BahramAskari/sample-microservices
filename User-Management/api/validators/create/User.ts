import Validator, {
    ValidationSchema,
    ValidationRuleObject,
    ValidationRule,
    ValidationError,
    Context
} from "fastest-validator"
import {validatorInstance} from "../index";
import {UserDto_Create_Payload, UserDto_Update_Payload} from "../../types/Dto/users";
import {isEmpty, isNil} from "lodash";
import UserCheck from "../../services/check/User";
const v = validatorInstance

const userCreateSchema: Partial< Record<keyof UserDto_Create_Payload, ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    /*
  id: {
      type: "number",
      optional: false,
      custom: async (value, errors) => {
          const exists = await TicketCheck.existsByField("id", value);
          if (!exists) throw new NotFoundError();
      }
  },
   */
    firstName: {
        type: "string",
        // optional: false,
        min: 3,
        max: 100,
        /*
        custom: async (value: any, errors, schema, name, parent, context) =>{
            console.log(`Create User: username is -> `, value)
        }
         */
    }, lastName: {
        type: "string",
        optional: false,
        nullable: false,
        empty: false,
        // min: 1,
        max: 100,
    }, username: {
        type: "string",
        optional: false,
        nullable: false,
        empty: false,
        // min: 1,
        max: 100,
        custom: async (value, errors) => {
            const exists = await UserCheck.existsByField("username", value);
            if (exists)
                errors.push({ type: "unique", actual: value, });
            return value;
        }
    }, email: {
        type: "email",
        optional: false,
        nullable: false,
        empty: false,
        // min: 1,
        max: 100,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            const exists = await UserCheck.existsByField("email", value);
            if (exists)
                errors.push({ type: "unique", actual: value, });
            return value;
        }
    },
    sign: {type: "string", optional: true, nullable: true,},
    isVerified: {type: "boolean", convert: true, default: false,},
    is2FAEnabled: {type: "boolean", convert: true, default: false,},
    password: { type: "string", min: 6, max: 120 },
}



const ValidateUserCreate = v.compile(userCreateSchema)



export {
    ValidateUserCreate,
}

