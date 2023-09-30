import {Province} from "../../../db/models";
import {isEmpty} from "lodash";
import {Province__Attributes } from "../../../db/models/Location/Province";
import {Op} from "sequelize";
import {id3v22TagMap} from "music-metadata/lib/id3v2/ID3v22TagMapper";


export default class ProvinceCheck {

    static async existsById (id: number): Promise<boolean> {
        const item = await Province.findOne({
            where: {
                id
            }
        });

        return !isEmpty(item)
    }

    static async existsByField <T extends keyof Province__Attributes >(field: T, value: Province__Attributes [T]): Promise<boolean>  {
        const item = await Province.findOne({
            where: {
                [field]: value
            }
        });

        return !isEmpty(item)
    }

    static async existsByFieldExceptItem  <T extends keyof Province__Attributes >(field: T, value: Province__Attributes [T], id: number): Promise<boolean> {
        const item = await Province.findOne({
            where: {
                id: {
                    [Op.ne]: id
                },
                [field]: value
            }
        });

        return !isEmpty(item)
    }

}
