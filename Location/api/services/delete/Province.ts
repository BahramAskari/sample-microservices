import {Province} from "../../../db/models";

export default class ProvinceDelete {



    static async deleteById (id: number): Promise<boolean>  {
        const deletedItemCount = await Province.destroy({
            where: {id},
            individualHooks: true,
            //  force: true,   Force-Delete against Soft-Delete
        })

        return !!deletedItemCount
    }


}

