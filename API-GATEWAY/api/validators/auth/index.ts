import Validator,{ValidationSchema, ValidationRuleObject,ValidationRule, ValidationError} from "fastest-validator"
import User, {User__Attributes , User__Output} from "../../../db/models/User";
import {RegisterUserDTO} from "../../Types/Dto/auth";
import {validatorInstance} from "../index";
import {LoginUserDTO} from "../../Types/Dto/auth";
import bcrypt from "bcryptjs";
import {isNil} from "lodash";


const v = validatorInstance

const registerSchema: Record<keyof RegisterUserDTO, ValidationRule> = {
// @ts-ignore
    $$async: true,
    username: {
        type: "string",
        min: 4,
        max: 120,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            // E.g. checking in the DB that the value is unique.
            const exists = await User.findOne({where: {username: value}});
            if (exists)
                errors.push({ type: "unique", field: "username", actual: value });
            return value;
        }
    },
    firstName: {type: "string", min: 3},
    lastName: {type: "string", optional: true, empty: true, nullable: true,},
    email: {
        type: "email",
        min: 8,
        max: 120,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            // E.g. checking in the DB that the value is unique.
            const exists = await User.findOne({where: {email: value}});
            if (exists)
                errors.push({ type: "unique", field: "email", actual: value });
            return value;
        }
    },
    password: { type: "string", min: 6, max: 120 },
    passwordConfirm: { type: "equal", field: "password" }
}

const authEmailLoginSchema: Record<keyof LoginUserDTO, ValidationRule> = {
// @ts-ignore
    $$async: true,
    email: {
        type: "email",
        min: 3,
        max: 150,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (!isNil(value)) {
            // E.g. checking in the DB that the value is unique.
            const exists = await User.findOne({where: {email: value}});
            console.log(`email is: `, value)
            console.log(`user with current email exists? : `, exists)
            if (!exists) errors.push({ type: "notTaken", field: "email", actual: value });
            }
            return value;
        }
    }, password: {
        type: "string",
        min: 3,
        max: 150,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (!isNil(value)) {
            // @ts-ignore
            //  const user = await UserFind.getByField("email", context.data.email)
            const user = await User.scope("withPassword").findOne({
                where: {
            // @ts-ignore
                    email: context.data.email,
                }
            })
            if (user){
                console.log(`Auth login-password from user input field is -> `, value)
                console.log(`User's password is -> `, user.password)
                const passwordCorrect = await bcrypt.compareSync(value, user.password)
                console.log(`Email is available or not ? `, passwordCorrect)
                if (!passwordCorrect) errors.push({ type: "compare", field: "password", actual: value, });
            }
                return value;
            }
        }
    },
}


const ValidateRegister = v.compile(registerSchema)
const ValidateLogin = v.compile(authEmailLoginSchema)




export {
    ValidateRegister,
    ValidateLogin,
}