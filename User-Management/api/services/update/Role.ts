import Role, {Role__Input, Role__Output} from "../../../db/models/User/Role";
import {NotFoundError, PartialErrors} from "../../errors";
import RoleFind from "../find/Role";
import RoleCheck from "../check/Role";
import {FieldsValidation} from "../../errors/FieldsValidation";
import sequelizeConnection from "../../../db/config";
import {Op} from "sequelize";


export default class RoleUpdate {

    static async update (id: number, payload: Partial<Role__Input>): Promise<Role__Output>  {
        const item = await RoleFind.getById(id)
        if (!item) throw new NotFoundError()

        const transaction = await sequelizeConnection.transaction()
        try {

            const codeExists = await RoleCheck.existsByFieldExceptItem("name", payload.name, id)
            if (codeExists) throw new FieldsValidation([{field: "code", type: "unique", actual: payload.name, }])


            await item.update(payload, {
                fields: ["name", "description",],
                transaction: transaction
            })



            await transaction.commit()
            return item
        } catch (e) {
            if(transaction) {
                console.log(e)
                await transaction.rollback();
                throw new PartialErrors([{code: "updateOne:UnCompleted"}])
            }
        }

    }



}