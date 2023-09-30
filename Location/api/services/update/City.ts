import City, {City__Input, City__Output} from "../../../db/models/Location/City";
import {NotFoundError, PartialErrors} from "../../errors";
import {isArray, isEmpty} from "lodash";
import CityFind from "../find/City";
import CityHandle from "../handle/City";
import {Op} from "sequelize";
import sequelizeConnection from "../../../db/config";

export default class CityUpdate {



    static async update (id: number, payload: Partial<City__Input>): Promise<City & City__Output>  {
        const item = await CityFind.getById(id)
        if (!item) throw new NotFoundError()

        const transaction = await sequelizeConnection.transaction()
        try {
            const {slug} = await CityHandle.makeSlugByFieldExceptItem(payload.name, item.id)
            payload.slug = slug;

            await item.update(payload, {
                fields: ["name", "slug", ],
                transaction: transaction
            })


            if (payload.ProvinceId){
                await item.setProvince(payload.ProvinceId, {transaction: transaction})
            }

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