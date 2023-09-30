import {FindOptions, Op} from "sequelize";
import {Country, User} from "../../../db/models";
import {Country__Output} from "../../../db/models/Location/Country";

export default class CountryFind {

    static async getById (id: number, options?: FindOptions): Promise<Country & Country__Output> {
        const item = await Country.findByPk(id, {
            include:[
                {model: User, as: "Creator"},
            ]
        })
        return item
    }

    static async getByIds (ids: number[], options?: FindOptions): Promise<Country[] & Country__Output[]> {
        const items = await Country.findAll( {
            where: {
                id: {[Op.in]: ids}
            },
            ...(options)
        })
        return items
    }


}