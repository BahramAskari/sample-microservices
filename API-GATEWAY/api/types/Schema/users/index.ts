import {User__Output} from "../../../../db/models/User";
/**
 * Get Schema
 * contains all possible fields that an item can return
 */

export type UserSchema_Get = Required<
    Omit<
        User__Output,
        |"Roles"
        |"CreatedRoles"
        >
    >


export type UserSchema_Create = UserSchema_Get