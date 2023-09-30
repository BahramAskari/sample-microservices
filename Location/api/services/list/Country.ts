import {isBoolean, isEmpty, isNil, isNumber, trim} from "lodash";
import {Province, User} from "../../../db/models";
import {Op, Sequelize, Attributes, FindAttributeOptions,} from "sequelize";
import {
    CountryDto_GetAll_Payload,
} from "../../types/Dto/countries";
import Country, {Country__Output} from "../../../db/models/Location/Country";
import {Country_FilterMapper} from "./filter-mapper/Country";


type T_Payload = {type?: undefined; itemId?: undefined; filters?: CountryDto_GetAll_Payload}

/**
 * @Class
 */
export default class CountryList {

    static async list (payload?: T_Payload): Promise<{rows: Country__Output[], count: number}>  {
        let Filters;
        ( isNil(payload.type) && !isNil(payload.filters) ) && ( Filters = await Country_FilterMapper.generalFilters(payload.filters)   );

        /** Find Attributes **/
        const find__Attributes: FindAttributeOptions | undefined = undefined;

        /**
         * Query
         */
        return Country.findAndCountAll({
            distinct: true,
            ...find__Attributes && {attributes: find__Attributes},

            where: {
                ...(Filters?.isDeleted && {deletedAt: {[Op.not]: null}}),
                ...(!isNil(trim(Filters?.query)) && {
                    [Op.or]: {
                        name: {[Op.like]: `%${trim(Filters.query)}%`},
                        slug: {[Op.like]: `%${trim(Filters.query)}%`},
                    },
                }),

                // not associated condition
                ...( (isBoolean(Filters.has_province) && !Filters.has_province ) && {
                    "$Provinces.id$": null
                }),

            },
            include:[
                /*  n to 1  */
                {model: User, as: "Creator",
                },
                /*  1 to n  */
                ...( isBoolean(Filters.has_province) ) ? [{model: Province, attributes: [], required: Filters.has_province}]: [],

            ],
            ...(Filters?.includeDeleted && {paranoid: true}),
            ...((Number(Filters.offset)>-1) && {offset: Filters.offset})  ,
            limit: Number(Filters.limit),
            subQuery: false,
        })
    }




}