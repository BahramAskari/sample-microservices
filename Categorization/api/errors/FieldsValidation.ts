/**
 * @example AccessError
 * @example PermissionError
 */
import {CustomError} from "./CustomError"
import {isEmpty, isNil, isArray} from "lodash";
import {ValidationFieldsErrorCustom} from "../validators";

//export class DatabaseValidation extends CustomError{
export class FieldsValidation extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationFieldsErrorCustom) {
        super('Invalid Fields Values');
        Object.setPrototypeOf(this, FieldsValidation.prototype);
    }


    // @ts-ignore
    serializeErrors(): {  errors: ValidationFieldsErrorCustom /* | {type: "files", expected: string[]}[]*/ } {
        return {
            //  type: "VALIDATION"
            errors:
                    ( isArray(this.errors) && !isNil(this.errors) && !isEmpty(this.errors) ) ?
                [
                ...(
                        this.errors.map(error=>
                            ({
                                field: error.field,
                                type: error.type,
                               // ...error?.fieldCaller && {fieldCaller: error.fieldCaller},
                                fieldCaller: "fieldCaller" in error ? error.fieldCaller: undefined,
                                actual: "actual" in error ? error.actual: undefined,
                                expected: "expected" in error ? error.expected: undefined,
                                max: "max" in error ? error.max: undefined,
                                message: error.message,
                            })
                        )
                )
            ]: true
        }
    }


}