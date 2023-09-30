import Validator, {
    ValidationSchema,
    ValidationRuleObject,
    ValidationRule,
    ValidationError,
    Context
} from "fastest-validator"
import {idArray_required, validatorInstance} from "../index";
import {isEmpty, isNil, isNumber} from "lodash";
import {NotFoundError, PartialErrors} from "../../errors";
import CountryCheck from "../../services/check/Country";
import ProvinceCheck from "../../services/check/Province";

const v = validatorInstance

export const countryId_validate: ValidationRule = {
    type: "number",
    optional: false,
    convert: true,
    custom: async (value: any, errors, schema, name, parent, context) =>{
        if (isNaN(value)) throw new NotFoundError();
        const exists = await CountryCheck.existsByField("id", value);
        if (!exists || isNaN(value)) throw new NotFoundError();
        return value;
    }
};
/**
 * Province
 */
const provinceAdd: Partial< Record<"countryId" | "provinceId", ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    countryId: countryId_validate,
    provinceId: {
        type: "number",
        optional: false,
        convert: true,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (
                isNaN(value)
                || !(await ProvinceCheck.existsById(value))
            ) throw new PartialErrors([{code: "addAssociation:NotExist", item: "Country", association: "Province", id: Number(value)}]);
            return value;
        },
    },
}
const provinceRemove: Partial< Record<"countryId" | "provinceId", ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    countryId: countryId_validate,
    provinceId: {
        type: "number",
        optional: false,
        convert: true,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (
                isNaN(value)
                || !(await ProvinceCheck.existsById(value))
            ) throw new PartialErrors([{code: "removeAssociation:NotExist", item: "Country", association: "Province", id: Number(value)}]);
            return value;
        },
    },
}







export const validateCountry_addProvince = v.compile(provinceAdd)
export const validateCountry_removeProvince = v.compile(provinceRemove)