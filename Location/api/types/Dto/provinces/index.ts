import {
    ListByIds_asTags,
    ListFilters,
    TListExactRelations,
    TListManyRelations,
    TUpdateManyRelations
} from "../../index";


export type ProvinceDto_Create_Payload  = {
    name: string;
    slug: string;

    CreatorId: number;
    CountryId: number;
}


 
export type ProvinceDto_Update_Payload = ProvinceDto_Create_Payload & {
    CountryId?: number
    cities?: number[]
}

export type DeleteManyProvincesDTO = {
    ids: number[]
}
export interface ProvinceDto_GetAll_Payload extends ListFilters {
    /*  Db General Fields   */
    /*  Associations Fields   */
    has_city?: boolean;
    //creators?: TListExactRelations          // 1 to n
    countries?: TListExactRelations         // 1 to n
}

export type ProvinceDto_GetCountries_Payload = Omit<ProvinceDto_GetAll_Payload, "countries">
export type ProvinceDto_Search_Payload = Omit<ProvinceDto_GetAll_Payload, "creators"|"countries"> & {
    creators?: { has?: boolean }
    countries?: { has?: boolean }
}