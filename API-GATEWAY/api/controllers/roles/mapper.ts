import {Role__Attributes, Role__Output} from "../../../db/models/Role";

export const toRole = (role: Role__Output): Role__Attributes  => ({
//export const toRole = (role: Role__OutputPermissions): Role__Attributes  => ({
    id: role.id,
    name: role.name,
    description: role.description,

    createdAt: role.createdAt,
    updatedAt: role.updatedAt,
    deletedAt: role.deletedAt,

})
export const toRoleWithAttached = (role: Role__Output): Partial<Role__Output> => ({
    id: role.id,

    name: role.name,
    description: role.description,

    Creator: role.Creator,

    createdAt: role.createdAt,
    updatedAt: role.updatedAt,
    deletedAt: role.deletedAt,

    Users: role.Users,

})

export const toRoleDelete = (deleted: boolean): boolean => deleted