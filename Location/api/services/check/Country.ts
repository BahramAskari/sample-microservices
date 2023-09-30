import Country, {Country__Attributes } from "../../../db/models/Location/Country";
import {isEmpty} from "lodash";
import {Op} from "sequelize";
import {id3v22TagMap} from "music-metadata/lib/id3v2/ID3v22TagMapper";


export default class CountryCheck {

    static async existsById (id: number): Promise<boolean> {
        const item = await Country.findOne({
            where: {
                id
            }
        });

        return !isEmpty(item)
    }

    static async existsByField <T extends keyof Country__Attributes >(field: T, value: Country__Attributes [T]): Promise<boolean>  {
        const item = await Country.findOne({
            where: {
                [field]: value
            }
        });

        return !isEmpty(item)
    }

    static async existsByFieldExceptItem  <T extends keyof Country__Attributes >(field: T, value: Country__Attributes [T], id: number): Promise<boolean> {
        const item = await Country.findOne({
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
