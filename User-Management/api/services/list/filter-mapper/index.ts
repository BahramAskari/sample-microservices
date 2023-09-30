import {ListFilters} from "../../../types";

export type ListFiltersMapperOutput = Omit<ListFilters,"itemsPerPage"> & {offset: number; limit: number;}
export type ListFileFiltersMapper__Output = {offset: number; limit: number;}