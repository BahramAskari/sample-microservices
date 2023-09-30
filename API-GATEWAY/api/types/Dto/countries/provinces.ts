import {
    ProvinceDto_Create_Payload,
    ProvinceDto_GetAll_Payload,
    ProvinceDto_Update_Payload
} from "../provinces";
import {ProvinceSchema_Get} from "../../Schema/provinces";

/* list */
export type CountryDto_GetProvinces_Payload = Omit<ProvinceDto_GetAll_Payload, "countries">
export type CountryDto_GetProvinces_Response = {
    count: number
    provinces: ProvinceSchema_Get[]
}

/* search */
export type CountryDto_SearchProvinces_Payload = ProvinceDto_GetAll_Payload
export type CountryDto_SearchProvinces_Response = {
    count: number
    provinces: ProvinceSchema_Get[]
}

/* search item based */
export type CountryDto_SearchProvincesItemBased_Payload = ProvinceDto_GetAll_Payload
export type CountryDto_SearchProvincesItemBased_Response = {
    count: number
    provinces: (ProvinceSchema_Get&{isRelated: boolean;})[]
}

/* get */
export type CountryDto_GetProvince_Payload = undefined
export type CountryDto_GetProvince_Response = {
    province: ProvinceSchema_Get
}


/* create */
export type CountryDto_CreateProvince_Payload = ProvinceDto_Create_Payload
export type CountryDto_CreateProvince_Response = {
    province: ProvinceSchema_Get
}

/* update */
export type CountryDto_UpdateProvince_Payload = ProvinceDto_Update_Payload
export type CountryDto_UpdateProvince_Response = {
    province: ProvinceSchema_Get
}

/* update field */

/* add */
export type CountryDto_AddProvince_Payload = undefined
export type CountryDto_AddProvince_Response = {
    success: boolean // true
}


/* remove */
export type CountryDto_RemoveProvince_Payload = undefined
export type CountryDto_RemoveProvince_Response = {
    success: boolean // true
}


/* add/create many */
export type CountryDto_AddOrCreateProvinces_Payload = {
    provinces: (number)[]
}
export type CountryDto_AddOrCreateProvinces_Response = {
    success: boolean // true
    info: {
        added: {
            count: number
            succeed: {count: number; ids: number[]}
            failed: {count: number; ids: number[]}
        }
        created: {
            count: number
            succeed: {count: number; ids: number[]}
            failed: {count: number; ids: number[]}
        }
    }
}

/* remove many */
export type CountryDto_RemoveProvinces_Payload = {
    ids?: number[]
}
export type CountryDto_RemoveProvinces_Response = {
    success: boolean // true
    count: number
    succeed: {count: number; ids: number[]}
    failed: {count: number; ids: number[]}
}

/* delete */
export type CountryDto_DeleteProvince_Payload = undefined
export type CountryDto_DeleteProvince_Response = {
    success: boolean // true
}

