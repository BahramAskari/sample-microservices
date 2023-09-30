import {isEmpty, isNil, isNumber, trim} from "lodash";
import {User} from "../../../db/models";
import {Op, Sequelize} from "sequelize";
import {
    TagsDto_Search_Payload,
    TagDto_GetAll_Payload,
} from "../../types/Dto/tags";
import Tag, {Tag__Output} from "../../../db/models/Tag";
import {Tag_FilterMapper} from "./filter-mapper/Tag";


type T_Payload = {type?: undefined; itemId?: undefined; filters?: TagDto_GetAll_Payload}

export default class TagList {


    static async list (payload?: T_Payload): Promise<{rows: Tag__Output[], count: number}>  {
        let Filters;
        ( isNil(payload.type) && !isNil(payload.filters) ) && ( Filters = await Tag_FilterMapper.generalFilters(payload.filters)   );

        return Tag.findAndCountAll({
            distinct: true,
            where: {
                ...(Filters?.isDeleted && {deletedAt: {[Op.not]: null}}),
                ...(!isNil(trim(Filters?.query)) && {
                    [Op.or]: {
                        name: {[Op.like]: `%${trim(Filters.query)}%`},
                        slug: {[Op.like]: `%${trim(Filters.query)}%`},
                        description: {[Op.like]: `%${trim(Filters.query)}%`},
                    },
                }),
                // not associated condition
            },
            include:[
                /*  n to 1  */
                {
                    model: User, as: "Creator",
                },


            ],
            ...(Filters?.includeDeleted && {paranoid: true}),
            ...((Number(Filters.offset)>-1) && {offset: Filters.offset})  ,
            limit: Number(Filters.limit),
            subQuery: false,
        })
    }




}