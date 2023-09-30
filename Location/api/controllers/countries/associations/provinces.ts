import {REQUEST} from "../../../routes";
import {NextFunction, Response} from "express";
import {ProvinceDto_GetAll_Payload, ProvinceDto_GetCountries_Payload} from "../../../types/Dto/provinces";
import ProvinceList from "../../../services/list/Province";
import {validateCountry_find} from "../../../validators/find/Country";
import {
    validateCountry_addProvince,
    validateCountry_removeProvince
} from "../../../validators/associations/Country";
import CountryFind from "../../../services/find/Country";
import {FieldsValidation} from "../../../errors/FieldsValidation";



export const listProvinces = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {countryId} = req.params
    const payload: ProvinceDto_GetCountries_Payload  = req.query
    try {
        // Begin Validation
        const validation = await validateCountry_find({id: countryId})
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        const item = await CountryFind.getById(Number(countryId))

        await ProvinceList.list({type: "country", itemId: Number(countryId), filters: payload}).then((items) => {
            return res.status(200).send({provinces: items.rows, count: items.count, item})
        })

    } catch (e) {next(e)}
}

export const addProvince = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {countryId, provinceId} = req.params
    try {
        // Begin Validation
        const validation = await validateCountry_addProvince(req.params)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation

        const item = await CountryFind.getById(Number(countryId))
        await item.addProvince(Number(provinceId))

         
        return res.status(204)

    } catch (e) {next(e)}
}
export const removeProvince = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {countryId, provinceId} = req.params
    try {
        // Begin Validation
        const validation = await validateCountry_removeProvince(req.params)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation

        const item = await CountryFind.getById(Number(countryId))
        await item.removeProvince(Number(provinceId))


        return res.status(204)

    } catch (e) {next(e)}
}