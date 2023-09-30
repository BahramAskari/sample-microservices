import Validator,{ValidationSchema, ValidationRuleObject,ValidationRule, ValidationError} from "fastest-validator"
import {isArray, isNumber} from "lodash";
import {stringToArray} from "../../lib/functions/HotFunctions";

const validatorInstance = new Validator({
    useNewCustomCheckerFunction: true, // using new version
    messages: {
        // Register our new error message text
        unique: "The '{field}' is already exist! Actual: {actual}",
        phone: "The field does not have a phone-number format",
        taken: "The field is already in use",
        notTaken: "The {field} is not in use! actual: {actual}",
        notEqual: "These fields can not be equal",
        compare: "The field (password) is not valid",
        postalCode: "The field is not valid as a postal code",
        filesUnexpected: "The file-type is not valid",
        filesMaxCount: "The files maximum allowed count is not valid. Maximum allowed files count: {max}",
        filesMaxSumSize: "The files sum-size is greater than max allowed size. Maximum allowed size: {max} bytes",
    },
    //defaults: {}
})

interface FilesTypeValidationError {
    field: string
    type: "filesUnexpected"
    expected: string[]
    message?: string
}
interface FilesLimitValidationError {
    field: string
    type: "filesMaxCount" | "filesMaxSumSize"
    //actual: number
    max: number    // max allowed
    message?: string
}
interface NotFoundValidationError {
    field: string
    type: "notFound"
    actual: number    // id
    message?: string
}




interface ValidationErrorCustom extends ValidationError {
    field: string;
    type: ValidationError["type"] | "unique" | "phone" | "taken" | "notTaken" | "notUnique" | "notEqual" | "compare" | "postalCode"
    fieldCaller?: string;
    actual?: any;
    expected?: any;
    message?: string;
}
export interface ValidationErrorFilesType extends FilesTypeValidationError {
    field: string
    type: "filesUnexpected"
    expected: string[]
    message?: string
}
export interface ValidationErrorFilesLimit extends FilesLimitValidationError {
    field: string
    type: "filesMaxCount" | "filesMaxSumSize"
    max: number    // max allowed
    message?: string
}
export interface ValidationErrorImageSquare {
    field: string
    type: "imageDimensionSquared"
    actualWidth: number
    actualHeight: number
    min?: number    // min width|height allowed
    max?: number    // max width|height allowed
    message?: string
}
export interface ValidationErrorImageDimension {
    field: string
    type: "imageDimensionCustom"
    actualWidth: number
    actualHeight: number
    minWidth?: number    // min width allowed
    maxWidth?: number    // max width allowed
    minHeight?: number    // min height allowed
    maxHeight?: number    // max height allowed
    message?: string
}


type ValidationFieldsErrorCustom  = (
    ValidationErrorCustom|ValidationErrorFilesType|ValidationErrorFilesLimit
    |ValidationErrorImageSquare|ValidationErrorImageDimension
    )[] | true

/**
 * General validators
 */
export const idArray_required: ValidationRule = {
    type: "array", optional: false, empty: false,
    custom: async (value, errors) => {
        if (!isArray(value)) errors.push({type: "array", field: "ids", actual: value,})
        // is array -> keep numeric ids
        return value.filter(val => isNumber(Number(val)) && !isNaN(Number(val)))
    }
};


const v = validatorInstance
const idArraySchema: Record<"ids", ValidationRule> = {
    // @ts-ignore
    $$async: true,
    ids: {
        type: "any", /* items: "number", */ optional: false, empty: false, nullable: false,
        custom: async (value, errors) => {
            if (!isArray(stringToArray(value))) errors.push({type: "array", field: "ids", actual: value,})
            // is array -> keep numeric ids
            return stringToArray(value).filter(val => isNumber(Number(val)) && !isNaN(Number(val)))
        }
    }
}

const idArraySchema_required: Record<"ids", ValidationRule> = {
    // @ts-ignore
    $$async: true,
    ids: idArray_required
}

const ValidateIdArray = v.compile(idArraySchema)
const ValidateIdArrayRequired = v.compile(idArraySchema_required)


export {
    validatorInstance,
    ValidationFieldsErrorCustom,
    ValidateIdArray,
    ValidateIdArrayRequired
}


