import {
    RoleDto_Create_Payload,
    RoleDto_GetAll_Payload,
    RoleDto_Update_Payload
} from "../roles";
import {RoleSchema_Get} from "../../Schema/roles";

/* list */
export type UserDto_GetRoles_Payload = Omit<RoleDto_GetAll_Payload, "users">
export type UserDto_GetRoles_Response = {
    count: number
    roles: RoleSchema_Get[]
}


/* get */
export type UserDto_GetRole_Payload = undefined
export type UserDto_GetRole_Response = {
    role: RoleSchema_Get
}



/* add */
export type UserDto_AddRole_Payload = undefined
export type UserDto_AddRole_Response = {
    success: boolean // true
}


/* remove */
export type UserDto_RemoveRole_Payload = undefined
export type UserDto_RemoveRole_Response = {
    success: boolean // true
}


/* delete */
export type UserDto_DeleteRole_Payload = undefined
export type UserDto_DeleteRole_Response = {
    success: boolean // true
}

