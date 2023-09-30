import {
    UserDto_Create_Payload,
    UserDto_GetAll_Payload,
    UserDto_Update_Payload
} from "../users";
import {UserSchema_Get} from "../../Schema/users";

/* list */
export type RoleDto_GetUsers_Payload = Omit<UserDto_GetAll_Payload, "roles">
export type RoleDto_GetUsers_Response = {
    count: number
    users: UserSchema_Get[]
}


/* get */
export type RoleDto_GetUser_Payload = undefined
export type RoleDto_GetUser_Response = {
    user: UserSchema_Get
}

/* add */
export type RoleDto_AddUser_Payload = undefined
export type RoleDto_AddUser_Response = {
    success: boolean // true
}


/* remove */
export type RoleDto_RemoveUser_Payload = undefined
export type RoleDto_RemoveUser_Response = {
    success: boolean // true
}

/* delete */
export type RoleDto_DeleteUser_Payload = undefined
export type RoleDto_DeleteUser_Response = {
    success: boolean // true
}