import {REQUEST} from "../../../routes";
import {NextFunction, Response} from "express";
import {
    ProvinceDto_GetCities_Payload,
} from "../../../types/Dto/provinces/cities";
import Location__Service from "../../../services/Location";



export const listCities = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {provinceId} = req.params
    const payload: ProvinceDto_GetCities_Payload  = req.query
    try {

        const response = await Location__Service.provinces_listCities(Number(provinceId), payload)
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
}

export const addCity = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {provinceId, cityId} = req.params
    try {

        const response = await Location__Service.provinces_addCity(Number(provinceId), Number(cityId))
        return res.status(204)

    } catch (e) {next(e)}
}
export const removeCity = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {provinceId, cityId} = req.params
    try {

        const response = await Location__Service.provinces_removeCity(Number(provinceId), Number(cityId))
        return res.status(204)

    } catch (e) {next(e)}
}