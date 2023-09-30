import {Role} from "../../../db/models";

export default class RoleDelete {



    static async deleteById (id: number): Promise<boolean>  {
        const deletedItemCount = await Role.destroy({
            where: {id},
            individualHooks: true,
            //  force: true,   Force-Delete against Soft-Delete
        })

        return !!deletedItemCount
    }


}

