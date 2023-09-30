import City, {City__Input, City__Output} from "../../../db/models/Location/City";
import sequelizeConnection from "../../../db/config";
import {PartialErrors} from "../../errors";

export default class CityUpload {


    static async create (payload: City__Input): Promise<City__Output>  {
        const transaction = await sequelizeConnection.transaction()
        try {
            
                const item =  await City.create(payload, {
                    fields:  ["name","slug",],
                    transaction
                })
                await item.setCreator(payload.CreatorId)
                if (payload.ProvinceId){
                    try {
                        await item.setProvince(payload.ProvinceId, {transaction} )
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