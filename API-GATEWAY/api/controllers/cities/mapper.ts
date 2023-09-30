import {City__Attributes, City__Output} from "../../../db/models/City";

export const toCity = (item: City__Output): City__Attributes  => ({
//export const toRole = (role: Role__OutputPermissions): Role__Attributes  => ({
    id: item.id,
    name: item.name,
    slug: item.slug,

    CreatorId: item.CreatorId,
    ProvinceId: item.ProvinceId,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    deletedAt: item.deletedAt,

})
export const toCityWithAttached = (item: City__Output): Partial<City__Output> => ({
    id: item.id,
    name: item.name,
    slug: item.slug,

    Creator: item.Creator,
    Province: item.Province,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    deletedAt: item.deletedAt,
})

export const toCityDelete = (deleted: boolean): boolean => deleted