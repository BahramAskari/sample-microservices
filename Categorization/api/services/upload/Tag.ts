import Tag, {Tag__Input, Tag__Output} from "../../../db/models/Tag";
import sequelizeConnection from "../../../db/config";
import {PartialErrors} from "../../errors";
import {isEmpty, isNil} from "lodash";
import TagHandle from "../handle/Tag";

export default class TagUpload {


    static async create (payload: Tag__Input): Promise<Tag__Output>  {
        const transaction = await sequelizeConnection.transaction()
        try {
            
                if (isNil(payload.slug) || isEmpty(payload.slug)) {
                    const {slug} = await TagHandle.makeSlugByField(payload.name)
                    payload.slug = slug;
                }
                const item =  await Tag.create(payload, {
                    fields:  ["name", "slug", "description",],
                    transaction
                })
                await item.setCreator(payload.CreatorId, {transaction: transaction})

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