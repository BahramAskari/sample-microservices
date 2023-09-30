import {REQUEST} from "../../../routes";
import {NextFunction, Response} from "express";
import {CityDto_GetProvinces_Payload} from "../../../types/Dto/cities";
import CityList from "../../../services/list/City";
import {validateProvince_find} from "../../../validators/find/Province";
import {FieldsValidation} from "../../../errors/FieldsValidation";
import {
    validateProvince_addCity,
    validateProvince_removeCity
} from "../../../validators/associations/Province";
import ProvinceFind from "../../../services/find/Province";
import {
    ProvinceDto_AddCity_Payload,
} from "../../../types/Dto/provinces/cities";



export const listCities = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {provinceId} = req.params
    const payload: CityDto_GetProvinces_Payload  = req.query
    try {
        // Begin Validation
        const validation = await validateProvince_find({id: provinceId})
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        const item = await ProvinceFind.getById(Number(provinceId))

        await CityList.list({type: "province", itemId: Number(provinceId), filters: payload}).then((items) => {
            return res.status(200).send({cities: items.rows, count: items.count, item})
        })

    } catch (e) {next(e)}
}

export const addCity = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {provinceId, cityId} = req.params
    const payload:ProvinceDto_AddCity_Payload = req.body
    try {
        // Begin Validation
        const validation = await validateProvince_addCity(req.params)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation

        const item = await ProvinceFind.getById(Number(provinceId))
        await item.addCity(Number(cityId))

         
        return res.status(204)

    } catch (e) {next(e)}
}
export const removeCity = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {provinceId, cityId} = req.params
    try {
        // Begin Validation
        const validation = await validateProvince_removeCity(req.params)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation

        const item = await ProvinceFind.getById(Number(provinceId))
        await item.removeCity(Number(cityId))

         
        return res.status(204)

    } catch (e) {next(e)}
}