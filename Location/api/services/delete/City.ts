import {City} from "../../../db/models";

export default class CityDelete {



    static async deleteById (id: number): Promise<boolean>  {
        const deletedItemCount = await City.destroy({
            where: {id},
            individualHooks: true,
            //  force: true,   Force-Delete against Soft-Delete
        })

        return !!deletedItemCount
    }


}

