/**
 * @example AccessError
 * @example PermissionError
 */
import {CustomError} from "./CustomError"
import {ValidationError} from "sequelize"

//export class DatabaseValidation extends CustomError{
export class SequelizeValidationError extends CustomError {
    statusCode = 400;
    constructor(public errors: ValidationError) {
        super('Invalid Request Parameters');
        Object.setPrototypeOf(this, SequelizeValidationError.prototype);
    }


    serializeErrors(): { errors: { message?: string; type?: string; field?: string; value?: string; validator?: string; args?: any[]; validatorArgs?: { min: any; max: any } }[]; partial?: { type: "alert"; result: {} | [] } } {
        return {
            errors: [
                ...(
                    (this.errors.errors)
                        .map(field=>
                            ({
                                type: "validation",
                                message: field.message,
                                field: field.path,
                                value: field.value,
                                validator: field.validatorKey,     // Validator.lookup(field.validatorKey)
                                args: field.validatorArgs,
                                validatorArgs: {
                                    min: (field.validatorArgs && field.validatorArgs.length>0) ? field.validatorArgs[0]: undefined,
                                    max: (field.validatorArgs && field.validatorArgs.length>0) ? field.validatorArgs[1]: undefined
                                } ,
                            })
                        )
                )
            ]
        }
    }


}