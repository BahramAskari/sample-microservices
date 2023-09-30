import Province, {Province__Input, Province__Output} from "../../../db/models/Location/Province";
import sequelizeConnection from "../../../db/config";
import {PartialErrors} from "../../errors";


export default class ProvinceUpload {


    static async create (payload: Province__Input): Promise<Province__Output>  {
        const transaction = await sequelizeConnection.transaction()
        try {

                const item =  await Province.create(payload, {
                    fields:  ["name","slug",],
                    transaction
                })
                await item.setCreator(payload.CreatorId)
                if (payload.CountryId){
                    try {
                        await item.setCountry(payload.CountryId, {transaction} )
                    } catch (e) {
                        console.log("Error occurred, but no problem. Follow next steps")
                    }
                }
                if (payload.cities){
                    try {
                        await item.setCities(payload.cities, {transaction} )
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