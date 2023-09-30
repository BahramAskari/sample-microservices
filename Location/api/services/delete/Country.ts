import {Country} from "../../../db/models";

export default class CountryDelete {



    static async deleteById (id: number): Promise<boolean>  {
        const deletedItemCount = await Country.destroy({
            where: {id},
            individualHooks: true,
            //  force: true,   Force-Delete against Soft-Delete
        })

        return !!deletedItemCount
    }


}

