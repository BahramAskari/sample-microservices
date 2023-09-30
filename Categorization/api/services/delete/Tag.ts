import {Tag} from "../../../db/models";

export default class TagDelete {



    static async deleteById (id: number): Promise<boolean>  {
        const deletedItemCount = await Tag.destroy({
            where: {id},
        })

        return !!deletedItemCount
    }

}

