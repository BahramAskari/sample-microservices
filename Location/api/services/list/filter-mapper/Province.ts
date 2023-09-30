import {listItemFilterToObject, stringToBoolean} from "../../../../lib/functions/HotFunctions";
import {
    ProvinceDto_Search_Payload,
    ProvinceDto_GetAll_Payload, ProvinceDto_GetCountries_Payload,
} from "../../../types/Dto/provinces";
import {FilterMapper, ListFiltersMapperOutput} from "../../../types";
import {isNil} from "lodash";


export class Province_FilterMapper {


    static generalFilters (filters: ProvinceDto_GetAll_Payload ): ListFiltersMapperOutput & ProvinceDto_GetAll_Payload {
        const general_payload = FilterMapper.generalListFilters(filters);
        const special_payload: ProvinceDto_GetAll_Payload = {
            has_city: filters?.has_city && stringToBoolean(filters.has_city),

            //creators: listItemFilterToObject(filters.creators),
            countries: listItemFilterToObject(filters.countries),
        }


        return {
            ...general_payload,
            ...special_payload
        }
    }

    static chooseFilters (filters: ProvinceDto_Search_Payload): ListFiltersMapperOutput & ProvinceDto_Search_Payload {
        let Filters = this.generalFilters(filters);
        //( !isNil(Filters.creators) && !isNil(Filters.creators.ids) ) && delete Filters.creators.ids;
        ( !isNil(Filters.countries) && !isNil(Filters.countries.ids) ) && delete Filters.countries.ids;
        return Filters;
    }

    static filters_for_country (filters: ProvinceDto_GetCountries_Payload): ListFiltersMapperOutput & ProvinceDto_GetCountries_Payload {
        return this.generalFilters(filters)
    }

}