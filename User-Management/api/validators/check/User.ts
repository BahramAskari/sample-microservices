import Validator, {
    ValidationSchema,
    ValidationRuleObject,
    ValidationRule,
    ValidationError,
    Context
} from "fastest-validator"
//import {checkSlugExists} from "../../user"
import {validatorInstance} from "../index";
import {NotFoundError} from "../../errors";
import UserCheck from "../../services/check/User";
const v = validatorInstance



const checkUsername: Partial< Record<"username", ValidationRule> > = {
    // @ts-ignore
    $$async: true,
   username: {
        type: "string",
        optional: false,
        nullable: false,
        empty: false,
        min: 3,
        max: 80,
       custom: async (value: any, errors, schema, name, parent, context) =>{
          // custom: async (value, errors, schema, parent, context) => {
           // @ts-ignore
            console.log(`Context of data for username`, context.data)
           // @ts-ignore
            const exists = await UserCheck.existsByField("username", value);
            if (exists)
                errors.push({ type: "unique", field: "username", actual: value, });
            return value;
        }
    },
}
const checkUsernameSync: Partial< Record<"id"|"username", ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    id: {
        type: "number",
        convert: true,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (isNaN(<any>value)) throw new NotFoundError();
            const exists = await UserCheck.existsByField("id", <number>value);
            if (!exists) throw new NotFoundError()
            return value;
        }
    },
   username: {
        type: "string",
        optional: false,
        nullable: false,
        empty: false,
        min: 3,
        max: 80,
       custom: async (value, errors, schema, name, parent, context: Context) =>{
            // @ts-ignore
           const exists = await UserCheck.existsByFieldExceptItem("username", <string>value, context.data.id);
           if (exists)
               errors.push({ type: "unique", field: "username", actual: value, });
           return value;
       }
    },
}
const checkEmail: Partial< Record<"email", ValidationRule> > = {
    // @ts-ignore
    $$async: true,
   email: {
        type: "email",
        optional: false,
        nullable: false,
        empty: false,
        // min: 1,
        max: 100,
        custom: async (value, errors) => {
            const exists = await UserCheck.existsByField("email", value);
            if (exists)
                errors.push({ type: "unique", field: "email", actual: value, });
            return value;
        }
    },
}
const checkEmailSync: Partial< Record<"email"|"id", ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    id: {
        type: "number",
        convert: true,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (isNaN(<any>value)) throw new NotFoundError();
            const exists = await UserCheck.existsByField("id", <any>value);
            if (!exists) throw new NotFoundError()
            return value;
        }
    },
    email: {
        type: "string",
        optional: false,
        nullable: false,
        empty: false,
        // min: 1,
        max: 100,
        custom: async (value, errors, schema, name, parent, context: Context) =>{
            // @ts-ignore
            const exists = await UserCheck.existsByFieldExceptItem("email", <string>value, context.data.id);
            if (exists)
                errors.push({ type: "unique", field: "email", actual: value, });
            return value;
        }
    },
}



const ValidateUserCheckUsername = v.compile(checkUsername)
const ValidateUserCheckUsernameSync = v.compile(checkUsernameSync)
const ValidateUserCheckEmail = v.compile(checkEmail)
const ValidateUserCheckEmailSync = v.compile(checkEmailSync)




export {
    ValidateUserCheckUsername,
    ValidateUserCheckUsernameSync,
    ValidateUserCheckEmail,
    ValidateUserCheckEmailSync,
}

