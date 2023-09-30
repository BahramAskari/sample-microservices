import {Province__Attributes, Province__Output} from "../../../db/models/Province";

export const toProvince = (item: Province__Output): Province__Attributes  => ({
//export const toRole = (role: Role__OutputPermissions): Role__Attributes  => ({
    id: item.id,
    name: item.name,
    slug: item.slug,

    CreatorId: item.CreatorId,
    CountryId: item.CountryId,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    deletedAt: item.deletedAt,

})
export const toProvinceWithAttached = (item: Province__Output): Partial<Province__Output> => ({
    id: item.id,

    name: item.name,
    slug: item.slug,

    Creator: item.Creator,
    Country: item.Country,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    deletedAt: item.deletedAt,

    Cities: item.Cities,

})

export const toProvinceDelete = (deleted: boolean): boolean => deleted