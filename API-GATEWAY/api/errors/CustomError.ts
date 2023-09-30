/**
 * @example AccessError
 * @example PermissionError
 */
import {ValidationError} from "sequelize"



export abstract class CustomError extends Error{
    abstract statusCode: number

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype)
        Object.setPrototypeOf(this, ValidationError.prototype)
    }


    abstract serializeErrors(): {
        errors:{
            type?: string,
            message?: string,
            field?: string,
            value?: string ,
            validator?: string ,
            args?: any[],
            validatorArgs?: {
                min: any,
                max: any
            } ,
        }[],
            result?: any
    }



}