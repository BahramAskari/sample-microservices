import User, {User__Attributes, User__Input, User__Output} from "../../../db/models/User/User";
import {NotFoundError, PartialErrors} from "../../errors";
import {isArray, isEmpty} from "lodash";
import UserFind from "../find/User";
import sequelizeConnection from "../../../db/config";
import {Op} from "sequelize";


export default class UserUpdate {


    static async update (id: number, payload: Partial<User__Input>): Promise<User__Output>  {
        const item = await UserFind.getById(id)
        if (!item) throw new NotFoundError()

        const transaction = await sequelizeConnection.transaction()
        try {

            await item.update(payload, {
                fields: ["username", "firstName", "lastName", "email", "password", "sign"],
                transaction: transaction
            })

            await transaction.commit()
            return item
        } catch (e) {
            console.log(e)
            await transaction.rollback();
            throw new PartialErrors([{code: "updateOne:UnCompleted"}])
        }

    }



}