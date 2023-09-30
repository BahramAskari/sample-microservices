import { Optional } from "sequelize"
import {
    ListByIds_asTags,
    ListFilters,
    TListExactRelations,
    TListManyRelations,
    TUpdateManyRelations
} from "../../index";


export type UserDto_Create_Payload  = {
    username: string;
    firstName: string;
    lastName?: string;
    sign?: string;
    email: string;
    password: string;

    CreatorId: number;

    roles?: number[]
}



export type UserDto_Update_Payload = Omit<Optional<UserDto_Create_Payload, 'username'|'firstName'|'email'|'password'>,"CreatorId"|"avatar"> & {
    roles?: number[]
}
export type UpdatePassword_User = { password: string }

export type UpdateMany_Users = {
    ids: number[]
    /*  Db General Fields   */
    /*  Associations Fields   */
    roles?: TUpdateManyRelations
}

export type DeleteMany_Users = {
    ids?: number[]
}
export interface UserDto_GetAll_Payload extends ListFilters {
    /*  Db General Fields   */
    has_email?: boolean
    has_emailValidFormat?: boolean
    /*  Associations Fields   */
    //  isOperator?: boolean
    /* 1 to n */
    //creators?: TListExactRelations          // 1 to n
    /* n to n */
    roles?: TListManyRelations
}

export type UserDto_GetRoles_Payload = Omit<UserDto_GetAll_Payload, "roles">

export type UserDto_Search_Payload = Omit<UserDto_GetAll_Payload, "creators"|"roles"|"permissions"|"departments"> & {
    creators?: { has?: boolean }
    roles?: { has?: boolean }
}