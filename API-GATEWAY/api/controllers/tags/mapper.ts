import {Tag__Attributes, Tag__Output} from "../../../db/models/Tag"

export const toTag = (item: Tag__Output): Tag__Attributes  => ({
    id: item.id,

    name: item.name,
    slug: item.slug,
    description: item.description,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    deletedAt: item.deletedAt
})

export const toTagWithAttached = (item: Tag__Output): Partial<Tag__Output> => ({
    id: item.id,

    name: item.name,
    slug: item.slug,
    description: item.description,
    CreatorId: item.CreatorId,

    Creator: item.Creator,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    deletedAt: item.deletedAt,

})

export const toTagDelete = (deleted: boolean): boolean => deleted

export const toUpdateManyResult = (affectedCount: number) => {
    return {
        count: affectedCount
    }
}
export const toBooleanResult = (deleted: boolean): boolean => deleted