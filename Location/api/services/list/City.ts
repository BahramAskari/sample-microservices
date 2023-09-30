import {isBoolean, isEmpty, isNil, isNumber, trim} from "lodash";
import {Province, User} from "../../../db/models";
import {Op, Sequelize} from "sequelize";
import {
    CityDto_GetAll_Payload,
    CityDto_GetProvinces_Payload,
} from "../../types/Dto/cities";
import City, {City__Output} from "../../../db/models/Location/City";
import {City_FilterMapper} from "./filter-mapper/City";
import list_itemHas from "../../../lib/functions/ListItemHas";


type T_Payload = {type?: undefined; itemId?: undefined; filters?: CityDto_GetAll_Payload} |
    {type: "province"; itemId: number; filters?: CityDto_GetProvinces_Payload}


export default class CityList {

    static async list (payload?: T_Payload): Promise<{rows: City__Output[], count: number}>  {
        let Filters;
        if (payload.filters){
            switch (payload.type) {
                case "province":    Filters = await City_FilterMapper.filters_for_province(payload.filters); break;
                default:
                    Filters = undefined;
            }
        }
        ( isNil(payload.type) && !isNil(payload.filters) ) && ( Filters = await City_FilterMapper.generalFilters(payload.filters)   );

        return City.findAndCountAll({
            distinct: true,
            where: {
                ...(Filters?.isDeleted && {deletedAt: {[Op.not]: null}}),
                ...(!isNil(trim(Filters?.query)) && {
                    [Op.or]: {
                        name: {[Op.like]: `%${trim(Filters.query)}%`},
                        slug: {[Op.like]: `%${trim(Filters.query)}%`},
                    },
                }),
                // not associated condition
                ...( (payload.type!=="province" && !isNil(list_itemHas(Filters.provinces))  && !Filters.provinces.has ) && {
                    "ProvinceId": null
                }),
            },
            include:[
                /*  n to 1  */
                {model: User, as: "Creator",
                },
                {model: Province,
                    ...( ( payload.type!=="province" && !isNil(list_itemHas(Filters.provinces)) ) &&
                        {
                            required: (!Filters.provinces.has && !isEmpty(Filters.provinces.ids)) ? true: Filters.provinces.has ,
                            ...(Filters.provinces.has && !isEmpty(Filters.provinces.ids) )  && {where: {id: {[Op.in]: Filters.provinces.ids}} } ,
                            ...(!Filters.provinces.has && !isEmpty(Filters.provinces.ids) )  && {where: {id: {[Op.notIn]: Filters.provinces.ids}} } ,
                        }
                    ),
                    ...(payload.type==="province" && {   where: {id: payload.itemId}     }   )
                },
                /*  1 to n  */

            ],
            ...(Filters?.includeDeleted && {paranoid: true}),
            ...((Number(Filters.offset)>-1) && {offset: Filters.offset})  ,
            limit: Number(Filters.limit),
            subQuery: false,
        })
    }



}