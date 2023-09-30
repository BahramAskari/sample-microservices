import Country, {Country__Input, Country__Output} from "../../../db/models/Location/Country";
import sequelizeConnection from "../../../db/config";

export default class CountryUpload {


    static async create (payload: Country__Input): Promise<Country__Output>  {
        const transaction = await sequelizeConnection.transaction()
        try {
                const item =  await Country.create(payload, {
                    fields:  ["name", "slug", "phoneCode"],
                    transaction
                })
                await item.setCreator(payload.CreatorId)
                if (payload.provinces){
                    try {
                        await item.setProvinces(payload.provinces, {transaction} )
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
                //// ToDo Partial ->  throw new PartialErrors(["ITEM_CREATE_NOT_COMPLETED"])
            }
        }
    }



}