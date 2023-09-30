import {
    TagsDto_Search_Payload,
    TagDto_GetAll_Payload,
} from "../../../types/Dto/tags";
import {isNil} from "lodash";
import {FilterMapper, ListFiltersMapperOutput} from "../../../types";


export class Tag_FilterMapper {


    static generalFilters (filters: TagDto_GetAll_Payload ): ListFiltersMapperOutput & TagDto_GetAll_Payload {
        const general_payload = FilterMapper.generalListFilters(filters);
        const special_payload: TagDto_GetAll_Payload = {
            //creators: listItemFilterToObject(filters.creators),
        }


        return {
            ...general_payload,
            ...special_payload
        }
    }

    static chooseFilters (filters: TagsDto_Search_Payload): ListFiltersMapperOutput & TagsDto_Search_Payload {
        let Filters = this.generalFilters(filters);
        //( !isNil(Filters.creators) && !isNil(Filters.creators.ids) ) && delete Filters.creators.ids;
        return Filters;
    }


}