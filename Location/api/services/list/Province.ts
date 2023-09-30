import {isBoolean, isEmpty, isNil, isNumber, trim} from "lodash";
import {City, Country, User} from "../../../db/models";
import {Op, Sequelize} from "sequelize";
import {
    ProvinceDto_GetAll_Payload,
    ProvinceDto_GetCountries_Payload, ProvinceDto_Search_Payload,
} from "../../types/Dto/provinces";
import Province, {Province__Output} from "../../../db/models/Location/Province";
import {Province_FilterMapper} from "./filter-mapper/Province";
import list_itemHas from "../../../lib/functions/ListItemHas";


type T_Payload = {type?: undefined; itemId?: undefined; filters?: ProvinceDto_GetAll_Payload} |
    {type: "country"; itemId: number; filters?: ProvinceDto_GetCountries_Payload}


export default class ProvinceList {


    static async list (payload?: T_Payload): Promise<{rows: Province__Output[], count: number}>  {
        let Filters;
        if (payload.filters){
            switch (payload.type) {
                case "country":    Filters = await Province_FilterMapper.filters_for_country(payload.filters); break;
                default:
                    Filters = undefined;
            }
        }
        ( isNil(payload.type) && !isNil(payload.filters) ) && ( Filters = await Province_FilterMapper.generalFilters(payload.filters)   );

        return Province.findAndCountAll({
            distinct: true,
            where: {
                ...(Filters?.isDeleted && {deletedAt: {[Op.not]: null}}),
                ...(!isNil(trim(Filters?.query)) && {
                    [Op.or]: {
                        name: {[Op.like]: `%${trim(Filters.query)}%`},
                    },
                }),
                // not associated condition
                ...( (payload.type!=="country" && !isNil(list_itemHas(Filters.countries))  && !Filters.countries.has ) && {
                    "CountryId": null
                }),  ...( (isBoolean(Filters.has_city) && !Filters.has_city ) && {
                    "$Cities.id$": null
                }),
            },
            include:[
                /*  n to 1  */
                {model: User, as: "Creator",
                },
                {model: Country,// as: "NationalLanguage",
                    ...( ( /* payload.type!=="" && */ !isNil(list_itemHas(Filters.countries)) ) &&
                        {
                            required: (!Filters.countries.has && !isEmpty(Filters.countries.ids)) ? true: Filters.countries.has ,
                            ...(Filters.countries.has && !isEmpty(Filters.countries.ids) )  && {where: {id: {[Op.in]: Filters.countries.ids}} } ,
                            ...(!Filters.countries.has && !isEmpty(Filters.countries.ids) )  && {where: {id: {[Op.notIn]: Filters.countries.ids}} } ,
                        }
                    ),
                      ...(payload.type==="country" && {   where: {id: payload.itemId}     }   )
                },
                /*  1 to n  */
                ...( isBoolean(Filters.has_city) ) ? [{model: City, attributes: [], required: Filters.has_city}]: [],


            ],
            ...(Filters?.includeDeleted && {paranoid: true}),
            ...((Number(Filters.offset)>-1) && {offset: Filters.offset})  ,
            limit: Number(Filters.limit),
            subQuery: false,
        })
    }




}