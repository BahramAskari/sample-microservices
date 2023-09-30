import Country, {Country__Input, Country__Output} from "../../../db/models/Location/Country";
import {NotFoundError, PartialErrors} from "../../errors";
import {isArray, isEmpty} from "lodash";
import CountryFind from "../find/Country";
import {Op} from "sequelize";
import sequelizeConnection from "../../../db/config";
import {CountryDto_Update_Payload} from "../../types/Dto/countries";

export default class CountryUpdate {



    static async update (id: number, payload: CountryDto_Update_Payload): Promise<Country & Country__Output>  {
        const item = await CountryFind.getById(id)
        if (!item) throw new NotFoundError()

        const transaction = await sequelizeConnection.transaction()
        try {

            await item.update(payload, {
                fields: ["name", "phoneCode", "slug", ],
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