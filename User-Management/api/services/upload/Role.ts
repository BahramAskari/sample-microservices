import Role, {Role__Input, Role__Output} from "../../../db/models/User/Role";
import sequelizeConnection from "../../../db/config";
import {PartialErrors} from "../../errors";

export default class RoleUpload {


    static async create (payload: Role__Input): Promise<Role__Output>  {
        const transaction = await sequelizeConnection.transaction()
        try {
            

                const item =  await Role.create(payload, {
                    fields:  ["name", "description",],
                    transaction
                })
                await item.setCreator(payload.CreatorId)

                if (payload.users){
                    try {
                        await item.setUsers(payload.users, {transaction} )
                    } catch (e) {
                        console.log("Error occurred, but no problem. Follow next steps")
                    }
                }

                await transaction.commit()
                 return item

        } catch (e) {
            if(transaction) {
                console.log(e)
                await transaction.rollback();
                throw new PartialErrors([{code: "create:UnCompleted"}])
            }
        }
    }




}