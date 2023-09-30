import {FindOptions, Op} from "sequelize";
import {Tag, User} from "../../../db/models";
import {Tag__Output} from "../../../db/models/Tag";

export default class TagFind {

    static async getById (id: number, options?: FindOptions): Promise<Tag & Tag__Output> {
        const item = await Tag.findByPk(id, {
            include:[
                {model: User, as: "Creator"},
            ]
        })
        return item
    }

    static async getByIds (ids: number[], options?: FindOptions): Promise<Tag[] & Tag__Output[]> {
        const items = await Tag.findAll( {
            where: {
                id: {[Op.in]: ids}
            },
        })
        return items
    }


}
