import {FindOptions, Op} from "sequelize";
import {Province, User} from "../../../db/models";
import {Province__Output} from "../../../db/models/Location/Province";

export default class ProvinceFind {

    static async getById (id: number, options?: FindOptions): Promise<Province & Province__Output> {
        const item = await Province.findByPk(id, {
            include:[
                {model: User, as: "Creator"},
                //{model: File, as: "DefaultCover"},
            ]
        })
        return item
    }

    static async getByIds (ids: number[], options?: FindOptions): Promise<Province[] & Province__Output[]> {
        const items = await Province.findAll( {
            where: {
                id: {[Op.in]: ids}
            },
            ...(options)
        })
        return items
    }


}
