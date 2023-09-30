import {City} from "../../../db/models";
import {isEmpty} from "lodash";
import {City__Attributes } from "../../../db/models/Location/City";
import {Op} from "sequelize";


export default class CityCheck {

    static async existsById (id: number): Promise<boolean> {
        const item = await City.findOne({
            where: {
                id
            }
        });

        return !isEmpty(item)
    }

    static async existsByField <T extends keyof City__Attributes >(field: T, value: City__Attributes [T]): Promise<boolean>  {
        const item = await City.findOne({
            where: {
                [field]: value
            }
        });

        return !isEmpty(item)
    }

    static async existsByFieldExceptItem  <T extends keyof City__Attributes >(field: T, value: City__Attributes [T], id: number): Promise<boolean> {
        const item = await City.findOne({
            where: {
                id: {
                    [Op.ne]: id
                },
                [field]: value
            }
        });

        return !isEmpty(item)
    }

}
