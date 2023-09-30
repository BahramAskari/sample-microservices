import {Tag} from "../../../db/models";
import {isEmpty} from "lodash";
import {Tag__Attributes } from "../../../db/models/Tag";
import {Op} from "sequelize";


export default class TagCheck {

    static async existsById (id: number): Promise<boolean> {
        const item = await Tag.findOne({
            where: {
                id
            }
        });

        return !isEmpty(item)
    }

    static async existsByField <T extends keyof Tag__Attributes >(field: T, value: Tag__Attributes [T]): Promise<boolean>  {
        const item = await Tag.findOne({
            where: {
                [field]: value
            }
        });

        return !isEmpty(item)
    }

    static async existsByFieldExceptItem  <T extends keyof Tag__Attributes >(field: T, value: Tag__Attributes [T], id: number): Promise<boolean> {
        const item = await Tag.findOne({
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
