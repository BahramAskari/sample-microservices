import {
    Tag,
    User
} from "../../db/models";
import {Op} from "sequelize";

export default class ArrayByIds {

    static async tags (ids: number[]): Promise<number[]> {
        return [
            ...(await Tag.findAll({
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