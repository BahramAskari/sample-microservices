import {isBoolean, isEmpty, isNil, trim,} from "lodash";
import {
    Role,
} from "../../../db/models";
import {Op, Sequelize} from "sequelize";
import {
    UserDto_GetAll_Payload, UserDto_Search_Payload,
    UserDto_GetRoles_Payload,
} from "../../types/Dto/users";
import User, {User__Output} from "../../../db/models/User/User";
import {User_FilterMapper} from "./filter-mapper/User";
import list_itemHas from "../../../lib/functions/ListItemHas";


type T_Payload = {type?: undefined; itemId?: undefined; filters?: UserDto_GetAll_Payload}
    | {type: "role"; itemId: number; filters?: UserDto_GetRoles_Payload}


export default class UserList {

    static async list (payload?: T_Payload): Promise<{rows: User__Output[], count: number}>  {
        let Filters;
        if (payload.filters){
            switch (payload.type) {
                case "role":    Filters = await User_FilterMapper.filters_for_role(payload.filters); break;
                default:
                    Filters = undefined;
            }
        }
        // @ts-ignore
        ( isNil(payload.type) && !isNil(payload.filters) ) && ( Filters = await User_FilterMapper.generalFilters(payload.filters)   );


        return User.findAndCountAll({
            distinct: true,
            where: {
                ...(Filters?.isDeleted && {deletedAt: {[Op.not]: null}}),
                ...(!isNil(trim(Filters?.query)) && {
                    [Op.or]: {
                        username: {[Op.like]: `%${trim(Filters.query)}%`},
                        firstName: {[Op.like]: `%${trim(Filters.query)}%`},
                        lastName: {[Op.like]: `%${trim(Filters.query)}%`},
                        email: {[Op.like]: `%${trim(Filters.query)}%`},
                    },
                }),
                    ...(!isNil(Filters.has_email) && {  ...(Filters.has_email ? {email: {[Op.ne]: null}, } : {email:  null, } )    } ),
                // not associated condition
                ...( (payload.type!=="role" && !isNil(list_itemHas(Filters.roles))  && !Filters.roles.has ) && {
                    "$Roles.id$": null
                }),
            },
            include:[
                /*  n to 1  */
                {model: User, as: "Creator",
                },
                /*  1 to 1  */
                /*  1 to n  */
                /*  n to n  */
                ...( payload.type==="role" || !isNil(list_itemHas(Filters.roles)) ) ? [{model: Role, attributes: [], ...( (payload.type!=="role" && !isNil(list_itemHas(Filters.roles)) ) && {  required: (!Filters.roles.has && !isEmpty(Filters.roles.ids)) ? true: Filters.roles.has, /* Begin specific ids */ ...!isEmpty(Filters.roles.ids) &&  {where: { id: { ...Filters.roles.has? {[Op.in]: Filters.roles.ids}: {[Op.notIn]: Filters.roles.ids} } } } /* End specific ids */  }), /* Begin specific type */...payload.type==="role" && {where: {id: payload.itemId}} /* End specific type */    }]: [],

            ],
            ...(Filters?.includeDeleted && {paranoid: true}),
            ...((Number(Filters.offset)>-1) && {offset: Filters.offset})  ,
            limit: Number(Filters.limit),
            subQuery: false,
        })
    }




}