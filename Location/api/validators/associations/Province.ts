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
import ProvinceCheck from "../../services/check/Province";
import CityCheck from "../../services/check/City";

const v = validatorInstance

export const provinceId_validate: ValidationRule = {
    type: "number",
    optional: false,
    convert: true,
    custom: async (value: any, errors, schema, name, parent, context) =>{
        if (isNaN(value)) throw new NotFoundError();
        const exists = await ProvinceCheck.existsByField("id", value);
        if (!exists || isNaN(value)) throw new NotFoundError();
        return value;
    }
};
/**
 * City
 */
const cityAdd: Partial< Record<"provinceId" | "cityId", ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    provinceId: provinceId_validate,
    cityId: {
        type: "number",
        optional: false,
        convert: true,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (
                isNaN(value)
                || !(await CityCheck.existsById(value))
            ) throw new PartialErrors([{code: "addAssociation:NotExist", item: "Province", association: "City", id: Number(value)}]);
            return value;
        },
    },
}
const cityRemove: Partial< Record<"provinceId" | "cityId", ValidationRule> > = {
    // @ts-ignore
    $$async: true,
    provinceId: provinceId_validate,
    cityId: {
        type: "number",
        optional: false,
        convert: true,
        custom: async (value: any, errors, schema, name, parent, context) =>{
            if (
                isNaN(value)
                || !(await CityCheck.existsById(value))
            ) throw new PartialErrors([{code: "removeAssociation:NotExist", item: "Province", association: "City", id: Number(value)}]);
            return value;
        },
    },
}






export const validateProvince_addCity = v.compile(cityAdd)
export const validateProvince_removeCity = v.compile(cityRemove)