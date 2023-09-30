import {isEmpty, isNil, isNumber, trim} from "lodash";
import {User} from "../../../db/models";
import {Op, Sequelize} from "sequelize";
import {
    RoleDto_GetAll_Payload,
    RoleDto_GetUsers_Payload,
} from "../../types/Dto/roles";
import Role, {Role__Output} from "../../../db/models/User/Role";
import {Role_FilterMapper} from "./filter-mapper/Role";
import list_itemHas from "../../../lib/functions/ListItemHas";


type T_Payload = {type?: undefined; itemId?: undefined; filters?: RoleDto_GetAll_Payload} |
    {type: "user"; itemId: number; filters?: RoleDto_GetUsers_Payload}

export default class RoleList {


    static async list (payload?: T_Payload): Promise<{rows: Role__Output[], count: number}>  {
        let Filters;
        if (payload.filters){
            switch (payload.type) {
                case "user":    Filters = await Role_FilterMapper.filters_for_user(payload.filters); break;
                default:
                    Filters = undefined;
            }
        }
        ( isNil(payload.type) && !isNil(payload.filters) ) && ( Filters = await Role_FilterMapper.generalFilters(payload.filters)   );

        return Role.findAndCountAll({
            distinct: true,
            where: {
                ...(Filters?.isDeleted && {deletedAt: {[Op.not]: null}}),
                ...(!isNil(trim(Filters?.query)) && {
                    [Op.or]: {
                        name: {[Op.like]: `%${trim(Filters.query)}%`},
                        description: {[Op.like]: `%${trim(Filters.query)}%`},
                    },
                }),
                // not associated condition
                ...( (payload.type!=="user" && !isNil(list_itemHas(Filters.users))  && !Filters.users.has ) && {
                    "$Users.id$": null
                }),
            },
            include:[
                /*  n to 1  */
                {model: User, as: "Creator",
                },
                /*  1 to 1  */
                /*  n to n  */
                ...( payload.type==="user" || !isNil(list_itemHas(Filters.users)) ) ? [{model: User, attributes: [], ...( (payload.type!=="user" && !isNil(list_itemHas(Filters.users)) ) && {  required: (!Filters.users.has && !isEmpty(Filters.users.ids)) ? true: Filters.users.has, /* Begin specific ids */ ...!isEmpty(Filters.users.ids) &&  {where: { id: { ...Filters.users.has? {[Op.in]: Filters.users.ids}: {[Op.notIn]: Filters.users.ids} } } } /* End specific ids */  }), /* Begin specific type */...payload.type==="user" && {where: {id: payload.itemId}} /* End specific type */    }]: [],

            ],
            ...(Filters?.includeDeleted && {paranoid: true}),
            ...((Number(Filters.offset)>-1) && {offset: Filters.offset})  ,
            limit: Number(Filters.limit),
            subQuery: false,
        })
    }




}