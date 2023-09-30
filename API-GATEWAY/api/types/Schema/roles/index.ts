import {Role__Output} from "../../../../db/models/Role";

/**
 * Get Schema
 * contains all possible fields that an item can return
 */
export type RoleSchema_Get = Required<
    Omit<
        Role__Output,
        |"Users"
        >
    >


export type RoleSchema_Create = RoleSchema_Get