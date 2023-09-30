import {Role} from "../../../db/models";
import {isEmpty} from "lodash";
import {Role__Attributes } from "../../../db/models/User/Role";
import {Op} from "sequelize";


export default class RoleCheck {

    static async existsById (id: number): Promise<boolean> {
        const item = await Role.findOne({
            where: {
                id
            }
        });

        return !isEmpty(item)
    }

    static async existsByField <T extends keyof Role__Attributes >(field: T, value: Role__Attributes [T]): Promise<boolean>  {
        const item = await Role.findOne({
            where: {
                [field]: value
            }
        });

        return !isEmpty(item)
    }

    static async existsByFieldExceptItem  <T extends keyof Role__Attributes>(field: T, value: Role__Attributes[T], id: number): Promise<boolean> {
        const item = await Role.findOne({
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
