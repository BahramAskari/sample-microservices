import { Optional } from "sequelize"
import {Country__Attributes , } from "../../../../db/models/Location/Country"
import {
    ListByIds_asTags,
    ListFilters,
    TListExactRelations,
    TListManyRelations,
    TUpdateManyRelations
} from "../../index";



export type CountryDto_Create_Payload  = {
    name: string;
    phoneCode: number;
    slug: string;       // passed by user

    CreatorId: number;

    provinces?: number[]
}


 
export type CountryDto_Update_Payload = Omit<Optional<CountryDto_Create_Payload, "name"|"phoneCode"|"slug">, "CreatorId"> & {
}

export type DeleteManyCountriesDTO = {
    ids: number[]
}
export interface CountryDto_GetAll_Payload extends ListFilters {
    /*  Db General Fields   */
    /*  Associations Fields   */
    //  isPrimary?: boolean;
    has_province?: boolean
    //creators?: TListExactRelations          // 1 to n
}

export type CountryDto_Search_Payload = Omit<CountryDto_GetAll_Payload, "creators"> & {
    creators?: { has?: boolean }
}