import {
    Role,
    User
} from "../../db/models";
import {Op} from "sequelize";

export default class ArrayByIds {



    static async roles (ids: number[]): Promise<number[]> {
        return [
            ...(await Role.findAll({
                where: {id: {[Op.in]: ids}},
                attributes: ["id"]
            }))
        ].map(item => item.id)
    }

    static async users (ids: number[]): Promise<number[]> {
        return [
            ...(await User.findAll({
                where: {id: {[Op.in]: ids}},
                attributes: ["id"]
            }))
        ].map(item => item.id)
    }


}