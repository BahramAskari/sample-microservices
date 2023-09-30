import {
    City,
    Country,
    Province,
    User
} from "../../db/models";
import {Op} from "sequelize";

export default class ArrayByIds {

    static async countries (ids: number[]): Promise<number[]> {
        return [
            ...(await Country.findAll({
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

    static async provinces (ids: number[]): Promise<number[]> {
        return [
            ...(await Province.findAll({
                where: {id: {[Op.in]: ids}},
                attributes: ["id"]
            }))
        ].map(item => item.id)
    }


    static async cities (ids: number[]): Promise<number[]> {
        return [
            ...(await City.findAll({
                where: {id: {[Op.in]: ids}},
                attributes: ["id"]
            }))
        ].map(item => item.id)
    }


}