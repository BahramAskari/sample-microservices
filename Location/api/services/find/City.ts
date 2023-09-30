import {FindOptions, Op} from "sequelize";
import {City, User, Province, Country} from "../../../db/models";
import {City__Output} from "../../../db/models/Location/City";

export default class CityFind {

    static async getById (id: number, options?: FindOptions): Promise<City & City__Output> {
        const item = await City.findByPk(id, {
            include:[
                {model: User, as: "Creator"},
                {model: Province, include: [ {model: Country} ]},
                // {model: File, as: "DefaultCover"},
            ]
        })
        return item
    }

    static async getByIds (ids: number[], options?: FindOptions): Promise<City[] & City__Output[]> {
        const items = await City.findAll( {
            where: {
                id: {[Op.in]: ids}
            },
            ...(options)
        })
        return items
    }


}
