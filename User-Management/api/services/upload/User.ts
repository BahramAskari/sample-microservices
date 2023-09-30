import User, {User__Input, User__Output} from "../../../db/models/User/User";
import sequelizeConnection from "../../../db/config";
import {UserDto_Create_Payload} from "../../types/Dto/users";

export default class UserUpload {


    static async create (payload: UserDto_Create_Payload): Promise<User__Output>  {
        const transaction = await sequelizeConnection.transaction()
        try {

                const item =  await User.create(payload, {
                    fields:  ["username", "firstName", "lastName", "sign", "email", "password"],
                    transaction
                })
                await item.setCreator(payload.CreatorId, {transaction: transaction})
                if (payload.roles){
                    try {
                        await item.setRoles(payload.roles, {transaction} )
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
                //// ToDo Partial ->  throw new PartialErrors(["CREATE_NOT_COMPLETED"])
            }
        }
    }

}