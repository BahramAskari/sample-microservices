import {FindOptions, Op} from "sequelize";
import {User,} from "../../../db/models";
import {User__Attributes, User__Output} from "../../../db/models/User/User";

export default class UserFind {

    static async getById (id: number, options?: FindOptions): Promise<User & User__Output> {
        const item = await User.findByPk(id, {
            include:[
                {model: User, as: "Creator"},
            ],
            ...options
        })
        return item
    }

    static async getByIds (ids: number[], options?: Omit<FindOptions, "where">): Promise<User[] & User__Output[]> {
        const items = await User.findAll( {
            where: {
                id: {[Op.in]: ids}
            },
            ...options
        })
        return items
    }

    static async getByField <T extends keyof User__Attributes>(field: T, value: User__Attributes[T]): Promise<User__Output>  {
        return await User.findOne({
            where: {
                [field]: value
            }
        });
    }


}
