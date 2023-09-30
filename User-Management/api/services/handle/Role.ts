import {Role__Input, Role__Output} from "../../../db/models/User/Role";
import {isArray, isEmpty, kebabCase} from "lodash";
import RoleCheck from "../check/Role";

export default class RoleHandle {



    static async makeSlugByField (field: string): Promise<{ field: string, slug: string }>  {
        /* maybe user can set slug  */
        let slug = kebabCase(field)
        const slugExists = await RoleCheck.existsByField("name", slug)
        slug = slugExists ? `${slug}-${Math.floor(Math.random() * 1000)}`: slug    // What is next line usage?
        return {field , slug}
    }

    static async makeSlugByFieldExceptItem (field: string, itemId: number): Promise<{ field: string, slug: string }>  {
        /* maybe user can set slug  */
        let slug = kebabCase(field)
        const slugExists = await RoleCheck.existsByFieldExceptItem("name", slug, itemId)
        // check if slug-{count-1} exists ? get slug-{max} and make slug-{max+1}: set current slug-{count-1}
        slug = slugExists ? `${slug}-${Math.floor(Math.random() * 1000)}`: slug    // What is next line usage?
        return {field , slug}
    }


}