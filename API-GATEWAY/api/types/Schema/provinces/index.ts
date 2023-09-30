import {Province__Output} from "../../../../db/models/Province";

/**
 * Get Schema
 * contains all possible fields that an item can return
 */
export type ProvinceSchema_Get = Required<
    Omit<
        Province__Output,
        |"Cities"
        >
    >


export type ProvinceSchema_Create = ProvinceSchema_Get