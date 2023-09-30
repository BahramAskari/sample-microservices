import {User__Attributes , User__Output} from "../../../db/models/User";

export const toUser = (item: User__Output): User__Attributes  => ({
//export const toRole = (role: Role__OutputPermissions): Role__Attributes  => ({
    id: item.id,
    username: item.username,
    firstName: item.firstName,
    lastName: item.lastName,
    fullName: item.fullName,
    email: item.email,
    sign: item.sign,
    refreshToken: item.refreshToken,
    password: item.password,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    deletedAt: item.deletedAt,

})
export const toUserWithAttached = (item: User__Output): User__Output => ({
    id: item.id,
    username: item.username,
    firstName: item.firstName,
    lastName: item.lastName,
    fullName: item.fullName,
    email: item.email,
    sign: item.sign,
    refreshToken: item.refreshToken,
    password: item.password,

    CreatorId: item.CreatorId,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    deletedAt: item.deletedAt,

    Roles: item.Roles,
})

export const toUserDelete = (deleted: boolean): boolean => deleted