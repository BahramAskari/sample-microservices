import { Optional } from "sequelize"
import {Tag__Attributes } from "../../../../db/models/Tag"
import {
    ListByIds_asTags,
    ListFilters,
    TListExactRelations,
    TListManyRelations,
    TUpdateManyRelations
} from "../../index";


export type TagDto_Create_Payload  = {
    name: string;
    slug?: string;
    description?: string;

    CreatorId: number
}

export type TagDto_Update_Payload = Optional<TagDto_Create_Payload, 'slug'|'name'>


export interface TagDto_GetAll_Payload extends ListFilters {
    /*  Db General Fields   */
    /*  Associations Fields   */
    //creators?: TListExactRelations          // 1 to n
}

export type TagsDto_Search_Payload = Omit<TagDto_GetAll_Payload, "creators"> & {
    creators?: { has?: boolean }
}