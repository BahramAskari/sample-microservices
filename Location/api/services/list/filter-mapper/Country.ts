import {listItemFilterToObject, stringToBoolean} from "../../../../lib/functions/HotFunctions";
import {
    CountryDto_Search_Payload,
    CountryDto_GetAll_Payload,
} from "../../../types/Dto/countries";
import {FilterMapper, ListFiltersMapperOutput} from "../../../types";
import {isNil} from "lodash";


export class Country_FilterMapper {


    static generalFilters (filters: CountryDto_GetAll_Payload ): ListFiltersMapperOutput & CountryDto_GetAll_Payload {
        const general_payload = FilterMapper.generalListFilters(filters);
        const special_payload: CountryDto_GetAll_Payload = {
            has_province: filters?.has_province && stringToBoolean(filters.has_province),

            //creators: listItemFilterToObject(filters.creators),
        }


        return {
            ...general_payload,
            ...special_payload
        }
    }

    static chooseFilters (filters: CountryDto_Search_Payload): ListFiltersMapperOutput & CountryDto_Search_Payload {
        let Filters = this.generalFilters(filters);
        //( !isNil(Filters.creators) && !isNil(Filters.creators.ids) ) && delete Filters.creators.ids;
        return Filters;
    }


}