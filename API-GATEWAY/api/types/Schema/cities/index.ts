import {City__Output} from "../../../../db/models/City";

/**
 * Get Schema
 * contains all possible fields that an item can return
 */
export type CitySchema_Get = Required<
    Omit<
        City__Output,
        |""
        >
    >


export type CitySchema_Create = CitySchema_Get