import {User} from "../../../db/models";

export default class UserDelete {


    static async deleteById (id: number): Promise<boolean>  {
        const deletedItemCount = await User.destroy({
            where: {id},
            //individualHooks: true,
            //  force: true,   Force-Delete against Soft-Delete
        })

        return !!deletedItemCount
    }

}

