import {listItemFilterToObject, stringToArray, stringToBoolean} from "../../../../lib/functions/HotFunctions";
import {
    UserDto_GetAll_Payload,
    UserDto_GetRoles_Payload,
    UserDto_Search_Payload,
} from "../../../types/Dto/users";
import {ListFiltersMapperOutput} from "./index";
import {isEmpty, isNil} from "lodash";
import {FilterMapper} from "../../../types";


export class User_FilterMapper {


    static generalFilters (filters: UserDto_GetAll_Payload ): ListFiltersMapperOutput & UserDto_GetAll_Payload {

        const general_payload = FilterMapper.generalListFilters(filters);
        const special_payload: UserDto_GetAll_Payload = {
            has_email: stringToBoolean(filters.has_email),
            has_emailValidFormat: stringToBoolean(filters.has_emailValidFormat),

            //creators: listItemFilterToObject(filters.creators),
            roles: listItemFilterToObject(filters.roles),
        }


        return {
            ...general_payload,
            ...special_payload
        }
    }

    static chooseFilters (filters: UserDto_Search_Payload): ListFiltersMapperOutput & UserDto_Search_Payload {
        let Filters = this.generalFilters(filters);
        //( !isNil(Filters.creators) && !isNil(Filters.creators.ids) ) && delete Filters.creators.ids;
        ( !isNil(Filters.roles) && !isNil(Filters.roles.ids) ) && delete Filters.roles.ids;
        return Filters;
    }

    static filters_for_role (filters: UserDto_GetRoles_Payload): ListFiltersMapperOutput & UserDto_GetRoles_Payload {
        return this.generalFilters(filters)
    }

}