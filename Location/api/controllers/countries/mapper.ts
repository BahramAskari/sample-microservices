import {Country__Attributes , Country__Output} from "../../../db/models/Location/Country";

export const toCountry = (item: Country__Output): Country__Attributes  => ({
//export const toRole = (role: Role__OutputPermissions): Role__Attributes  => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    phoneCode: item.phoneCode,

    CreatorId: item.CreatorId,
    NationalLanguageId: item.NationalLanguageId,
    DefaultFlagId: item.DefaultFlagId,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    deletedAt: item.deletedAt,

})
export const toCountryWithAttached = (item: Country__Output): Country__Output => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    phoneCode: item.phoneCode,

    CreatorId: item.CreatorId,
    NationalLanguageId: item.NationalLanguageId,
    DefaultFlagId: item.DefaultFlagId,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    deletedAt: item.deletedAt,

    Creator: item.Creator,
    Provinces: item.Provinces,
    DefaultFlag: item.DefaultFlag,
    Flags: item.Flags,
})

export const toCountryDelete = (deleted: boolean): boolean => deleted