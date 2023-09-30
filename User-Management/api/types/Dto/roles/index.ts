import { Optional } from "sequelize"
import {Role__Attributes } from "../../../../db/models/User/Role"
import {
    ListByIds_asTags,
    ListFilters,
    TListExactRelations,
    TListManyRelations,
    TUpdateManyRelations
} from "../../index";


export type RoleDto_Create_Payload  = {
    name: string;
    description?: string;

    CreatorId: number;

    users?: number[];
}


export type RoleDto_Update_Payload = Omit<Optional<RoleDto_Create_Payload, 'name'>, "CreatorId">

export type RolesDto_UpdateMany_Payload = {
    ids: number[]
    /*  Db General Fields   */
    /*  Associations Fields   */
    users?: TUpdateManyRelations
}

export type DeleteManyRolesDTO = {
    ids: number[]
}



export interface RoleDto_GetAll_Payload extends ListFilters {
    /*  Db General Fields   */
    /*  Associations Fields   */
    //creators?: TListExactRelations          // 1 to n
    users?: TListManyRelations         // n to n
}

export type RoleDto_GetUsers_Payload = Omit<RoleDto_GetAll_Payload, "users">

export type RoleDto_Search_Payload = Omit<RoleDto_GetAll_Payload, "creators"|"permissions"| "users"> & {
    creators?: { has?: boolean }
    users?: { has?: boolean }
}