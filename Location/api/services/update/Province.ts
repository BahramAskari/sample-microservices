import Province, {Province__Input, Province__Output} from "../../../db/models/Location/Province";
import {NotFoundError, PartialErrors} from "../../errors";
import {isArray, isEmpty} from "lodash";
import ProvinceFind from "../find/Province";
import ProvinceCheck from "../check/Province";
import sequelizeConnection from "../../../db/config";
import {Op} from "sequelize";
import {FieldsValidation} from "../../errors/FieldsValidation";

export default class ProvinceUpdate {



    static async update (id: number, payload: Partial<Province__Input>): Promise<Province__Output>  {
        const item = await ProvinceFind.getById(id)
        if (!item) throw new NotFoundError()

        const transaction = await sequelizeConnection.transaction()
        try {

            const slugExists = await ProvinceCheck.existsByFieldExceptItem("slug", payload.slug, id);
            if (slugExists) throw new FieldsValidation([{field: "slug", type: "unique", actual: payload.slug}])

            await item.update(payload, {
                fields: ["name", "slug"],
                transaction: transaction
            })

            if (payload.CountryId){
                await item.setCountry(payload.CountryId, {transaction: transaction})
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