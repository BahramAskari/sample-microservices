import {Country__Output} from "../../../../db/models/Country";

/**
 * Get Schema
 * contains all possible fields that an item can return
 */
export type CountrySchema_Get = Required<
    Omit<
        Country__Output,
        |"Provinces"
        >
    >


export type CountrySchema_Create = CountrySchema_Get