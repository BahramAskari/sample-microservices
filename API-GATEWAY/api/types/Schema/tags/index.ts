import {Tag__Output} from "../../../../db/models/Tag";
/**
 * Get Schema
 * contains all possible fields that an item can return
 */

export type TagSchema_Get = Required<
    Omit<
        Tag__Output,
        |""
        >
    >


export type TagSchema_Create = TagSchema_Get