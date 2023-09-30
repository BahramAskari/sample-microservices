import {User} from "../../../db/models";
import {isEmpty} from "lodash";
import {User__Attributes } from "../../../db/models/User/User";
import {Op} from "sequelize";


export default class UserCheck {

    static async existsById (id: number): Promise<boolean> {
        const item = await User.findOne({
            where: {
                id
            }
        });

        return !isEmpty(item)
    }

    static async existsByField <T extends keyof User__Attributes >(field: T, value: User__Attributes [T]): Promise<boolean>  {
        const item = await User.findOne({
            where: {
                [field]: value
            }
        });

        return !isEmpty(item)
    }

    static async existsByFieldExceptItem  <T extends keyof User__Attributes>(field: T, value: User__Attributes[T], id: number): Promise<boolean> {
        const item = await User.findOne({
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
