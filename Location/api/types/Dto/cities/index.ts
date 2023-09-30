import { Optional } from "sequelize"
import {City__Attributes, } from "../../../../db/models/Location/City"
import {
    ListByIds_asTags,
    ListFilters,
    TListExactRelations,
    TListManyRelations,
    TUpdateManyRelations
} from "../../index";


export type CityDto_Create_Payload  = {
    name: string;
    slug: string;

    CreatorId: number;
    ProvinceId: number;
}



export type CityDto_Update_Payload = CityDto_Create_Payload & {
}

export type DeleteManyCitiesDTO = {
    ids: number[]
}
export interface CityDto_GetAll_Payload extends ListFilters {
    /*  Db General Fields   */
    /*  Associations Fields   */
    //creators?: TListExactRelations          // 1 to n
    provinces?: TListExactRelations         // 1 to n
}

export type CityDto_GetProvinces_Payload = Omit<CityDto_GetAll_Payload, "provinces">
export type CityDto_Search_Payload = Omit<CityDto_GetAll_Payload, "creators"|"provinces"> & {
    creators?: { has?: boolean }
    provinces?: { has?: boolean }
}