import {listItemFilterToObject, stringToBoolean} from "../../../../lib/functions/HotFunctions";
import {
    CityDto_Search_Payload,
    CityDto_GetAll_Payload,
    CityDto_GetProvinces_Payload,
} from "../../../types/Dto/cities";
import {FilterMapper, ListFiltersMapperOutput} from "../../../types";
import {isNil} from "lodash";


export class City_FilterMapper {


    static generalFilters (filters: CityDto_GetAll_Payload ): ListFiltersMapperOutput & CityDto_GetAll_Payload {
        const general_payload = FilterMapper.generalListFilters(filters);
        const special_payload: CityDto_GetAll_Payload = {
            //creators: listItemFilterToObject(filters.creators),
            provinces: listItemFilterToObject(filters.provinces),
        }


        return {
            ...general_payload,
            ...special_payload
        }
    }


    static chooseFilters (filters: CityDto_Search_Payload): ListFiltersMapperOutput & CityDto_Search_Payload {
        let Filters = this.generalFilters(filters);
        //( !isNil(Filters.creators) && !isNil(Filters.creators.ids) ) && delete Filters.creators.ids;
        ( !isNil(Filters.provinces) && !isNil(Filters.provinces.ids) ) && delete Filters.provinces.ids;
        return Filters;
    }

    static filters_for_province (filters: CityDto_GetProvinces_Payload): ListFiltersMapperOutput & CityDto_GetProvinces_Payload {
        return this.generalFilters(filters)
    }

}