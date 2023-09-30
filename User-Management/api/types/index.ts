import {isEmpty, isNil, toString} from "lodash";
import {stringToBoolean} from "../../lib/functions/HotFunctions";

export type ListFiltersMapperOutput = Omit<ListFilters,"itemsPerPage"> & {offset: number; limit: number;}
export type ListFileFiltersMapper__Output = {offset: number; limit: number;}

export interface ListFilters {
    page?: number
    itemsPerPage?: number
    //limit?: number
    //offset?: number
    isDeleted?: boolean
    includeDeleted?: boolean
    query?: string
    
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
    // itemsPerPage?: number
}


export type TUpdateManyRelations = {type: "add" | "set"; ids: number[]}
//  export type TListExactRelations = {has: false} | {has: true; ids?: number[]}
export type TListExactRelations = {has?: boolean; ids?: number[]}
export type TListManyRelations_Has = {
    has: true;
    ids?: number[]
    //  type: "include" | "exact";
    //  definition?: "defined" | "undefined";       // not set -> `all`
}
export type TListManyRelations_HasNot = {   has: false;     }
//  export type TListManyRelations = TListManyRelations_Has | TListManyRelations_HasNot

export type TListManyRelations = { has?: boolean; ids?: number[]  }

export type DeleteMany = { ids: number[]  }



export interface EcommerceListFilters {
    itemsPerPage?: number
    page?: number
    limit?: number
    offset?: number
    isDeleted?: boolean
    includeDeleted?: boolean
    hasCreator?: boolean
    query?: string
    onlyExist?: boolean
    priceRange?: Range
    separateGroup__Attributes?: boolean  //  products with multiple attributes will be separated
}


export interface GetAllIngredientsFilters extends ListFilters {}
export interface GetAllRecipesFilters extends ListFilters {}
export interface GetAllReviewsFilters extends ListFilters {
    isPublished?: boolean
}


export class FilterMapper {


    static generalListFilters (filters: ListFilters ): ListFiltersMapperOutput {
        let limit = (  !isNil(filters.itemsPerPage) && Number(filters.itemsPerPage) > 0  ) ? Number(filters.itemsPerPage): 40;
        let page = Number(filters.page) > 0 ? Number(filters.page): 1
        let offset = Number(limit) * (page-1)
        //  let offset = Number(filters?.limit) * (page-1)
        filters.isDeleted = stringToBoolean(filters.isDeleted);
        filters.includeDeleted = stringToBoolean(filters.includeDeleted);
        ( !isNil(filters.query) && !isEmpty(filters.query) ) ? filters.query = toString(filters.query): delete filters.query
        //filters?.query && (filters.query = toString(filters.query) );
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