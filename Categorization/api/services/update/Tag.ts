import Tag, {Tag__Input, Tag__Output} from "../../../db/models/Tag";
import {NotFoundError, PartialErrors} from "../../errors";
import {isArray, isEmpty, isNil} from "lodash";
import TagFind from "../find/Tag";
import sequelizeConnection from "../../../db/config";
import TagHandle from "../handle/Tag";
import {Op} from "sequelize";

export default class TagUpdate {



    static async update (id: number, payload: Partial<Tag__Input>): Promise<Tag__Output>  {
        const item = await TagFind.getById(id)
        if (!item) throw new NotFoundError()

        const transaction = await sequelizeConnection.transaction()
        try {

            if (isNil(payload.slug) || isEmpty(payload.slug)) {
                const {slug} = await TagHandle.makeSlugByFieldExceptItem(payload.name, id);
                payload.slug = slug;
            }

            await item.update(payload, {
                fields: ["name", "description", "slug"],
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