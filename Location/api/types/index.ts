import {isEmpty, isNil, toString} from "lodash";
import {stringToBoolean} from "../../lib/functions/HotFunctions";

export type ListFiltersMapperOutput = Omit<ListFilters,"itemsPerPage"> & {offset: number; limit: number;}
export type ListFileFiltersMapper__Output = {offset: number; limit: number;}

export interface ListFilters {
    page?: number
    itemsPerPage?: number
    isDeleted?: boolean
    includeDeleted?: boolean
    query?: string
    date?: Date | {from: Date; to: Date}
}

export interface File_ListFilters {
    page?: number
    itemsPerPage?: number
}

export interface ListByIds_asTags<Model__Attributes > {
    ids?: number[]
    page?: number
    tagField?: keyof Model__Attributes ;
    tooltipField?: keyof Model__Attributes ;
}

export type TUpdateManyRelations = {type: "add" | "set"; ids: number[]}
export type TListExactRelations = {has?: boolean; ids?: number[]}

export type TListManyRelations = { has?: boolean; ids?: number[]  }

export type DeleteMany = { ids: number[]  }





export class FilterMapper {


    static generalListFilters (filters: ListFilters ): ListFiltersMapperOutput {
        let limit = (  !isNil(filters.itemsPerPage) && Number(filters.itemsPerPage) > 0  ) ? Number(filters.itemsPerPage): 40;
        let page = Number(filters.page) > 0 ? Number(filters.page): 1
        let offset = Number(limit) * (page-1)
        filters.isDeleted = stringToBoolean(filters.isDeleted);
        filters.includeDeleted = stringToBoolean(filters.includeDeleted);
        ( !isNil(filters.query) && !isEmpty(filters.query) ) ? filters.query = toString(filters.query): delete filters.query
        return {
            page: page,
            limit: limit,
            offset: offset,
            isDeleted: filters?.isDeleted,
            includeDeleted: filters?.includeDeleted,
            query: filters?.query,
        }
    }

    static fileListFilters (filters: File_ListFilters ): ListFileFiltersMapper__Output {

        let limit = (  !isNil(filters.itemsPerPage) && Number(filters.itemsPerPage) > 0  ) ? Number(filters.itemsPerPage): 40;
        let page = Number(filters.page) > 0 ? Number(filters.page): 1
        let offset = Number(limit) * (page-1)
        return {
            limit: limit,
            offset: offset,
        }
    }

}