import {Tag__Input, Tag__Output} from "../../../db/models/Tag";
import {isArray, isEmpty, kebabCase} from "lodash";
import TagCheck from "../check/Tag";

export default class TagHandle {



    static async makeSlugByField (field: string): Promise<{ field: string, slug: string }>  {
        /* maybe user can set slug  */
        let slug = kebabCase(field)
        const slugExists = await TagCheck.existsByField("slug", slug)
        slug = slugExists ? `${slug}-${Math.floor(Math.random() * 1000)}`: slug    // What is next line usage?
        return {field , slug}
    }

    static async makeSlugByFieldExceptItem (field: string, itemId: number): Promise<{ field: string, slug: string }>  {
        /* maybe user can set slug  */
        let slug = kebabCase(field)
        const slugExists = await TagCheck.existsByFieldExceptItem("slug", slug, itemId)
        // check if slug-{count-1} exists ? get slug-{max} and make slug-{max+1}: set current slug-{count-1}
        slug = slugExists ? `${slug}-${Math.floor(Math.random() * 1000)}`: slug    // What is next line usage?
        return {field , slug}
    }


}