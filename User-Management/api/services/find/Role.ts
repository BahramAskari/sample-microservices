import {FindOptions, Op} from "sequelize";
import {Role, User} from "../../../db/models";
import {Role__Output} from "../../../db/models/User/Role";

export default class RoleFind {

    static async getById (id: number, options?: FindOptions): Promise<Role & Role__Output> {
        const item = await Role.findByPk(id, {
            include:[
                {model: User, as: "Creator"},
            ]
        })
        return item
    }

    static async getByIds (ids: number[], options?: FindOptions): Promise<Role[] & Role__Output[]> {
        const items = await Role.findAll( {
            where: {
                id: {[Op.in]: ids}
            },
            ...(options)
        })
        return items
    }


}
