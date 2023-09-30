import {listItemFilterToObject, stringToBoolean} from "../../../../lib/functions/HotFunctions";
import {
    RoleDto_GetAll_Payload,
    RoleDto_GetUsers_Payload,
    RoleDto_Search_Payload
} from "../../../types/Dto/roles";
import {ListFiltersMapperOutput} from "./index";
import {FilterMapper} from "../../../types";
import {isNil} from "lodash";


export class Role_FilterMapper {

    static generalFilters (filters: RoleDto_GetAll_Payload ): ListFiltersMapperOutput & RoleDto_GetAll_Payload {
        const general_payload = FilterMapper.generalListFilters(filters);
        const special_payload: RoleDto_GetAll_Payload = {
            //creators: listItemFilterToObject(filters.creators),
            users: listItemFilterToObject(filters.users),
        }


        return {
            ...general_payload,
            ...special_payload
        }
    }

    static chooseFilters (filters: RoleDto_Search_Payload): ListFiltersMapperOutput & RoleDto_Search_Payload {
        let Filters = this.generalFilters(filters);
        //( !isNil(Filters.creators) && !isNil(Filters.creators.ids) ) && delete Filters.creators.ids;
        ( !isNil(Filters.users) && !isNil(Filters.users.ids) ) && delete Filters.users.ids;
        return Filters;
    }

    static filters_for_user (filters: RoleDto_GetUsers_Payload): ListFiltersMapperOutput & RoleDto_GetUsers_Payload {
        return this.generalFilters(filters)
    }

}