import {
    CityDto_Create_Payload,
    CityDto_GetAll_Payload,
    CityDto_Update_Payload
} from "../cities";
import {CitySchema_Get} from "../../Schema/cities";

/* list */
export type ProvinceDto_GetCities_Payload = Omit<CityDto_GetAll_Payload, "provinces">
export type ProvinceDto_GetCities_Response = {
    count: number
    cities: CitySchema_Get[]
}

/* search */
export type ProvinceDto_SearchCities_Payload = CityDto_GetAll_Payload
export type ProvinceDto_SearchCities_Response = {
    count: number
    cities: CitySchema_Get[]
}

/* search item based */
export type ProvinceDto_SearchCitiesItemBased_Payload = CityDto_GetAll_Payload
export type ProvinceDto_SearchCitiesItemBased_Response = {
    count: number
    cities: (CitySchema_Get&{isRelated: boolean;})[]
}

/* get */
export type ProvinceDto_GetCity_Payload = undefined
export type ProvinceDto_GetCity_Response = {
    city: CitySchema_Get
}


/* create */
export type ProvinceDto_CreateCity_Payload = CityDto_Create_Payload
export type ProvinceDto_CreateCity_Response = {
    city: CitySchema_Get
}

/* update */
export type ProvinceDto_UpdateCity_Payload = CityDto_Update_Payload
export type ProvinceDto_UpdateCity_Response = {
    city: CitySchema_Get
}

/* update field */

/* add */
export type ProvinceDto_AddCity_Payload = undefined
export type ProvinceDto_AddCity_Response = {
    success: boolean // true
}


/* remove */
export type ProvinceDto_RemoveCity_Payload = undefined
export type ProvinceDto_RemoveCity_Response = {
    success: boolean // true
}


/* add/create many */
export type ProvinceDto_AddOrCreateCities_Payload = {
    cities: (number)[]
}
export type ProvinceDto_AddOrCreateCities_Response = {
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
export type ProvinceDto_RemoveCities_Payload = {
    ids?: number[]
}
export type ProvinceDto_RemoveCities_Response = {
    success: boolean // true
    count: number
    succeed: {count: number; ids: number[]}
    failed: {count: number; ids: number[]}
}

/* delete */
export type ProvinceDto_DeleteCity_Payload = undefined
export type ProvinceDto_DeleteCity_Response = {
    success: boolean // true
}

