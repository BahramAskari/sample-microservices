import {Country__Output} from "../../../../db/models/Location/Country";

/**
 * Get Schema
 * contains all possible fields that an item can return
 */
export type CountrySchema_Get = Required<
    Omit<
        Country__Output,
        |"Flags"
        |"Provinces"
        |"Languages"
        |"Songs"
        >
    >


export type CountrySchema_Create = CountrySchema_Get