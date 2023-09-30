import {REQUEST} from "../../../routes";
import {NextFunction, Response} from "express";
import Location__Service from "../../../services/Location";
import {CountryDto_GetProvinces_Payload} from "../../../types/Dto/countries/provinces";



export const listProvinces = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {countryId} = req.params
    const payload: CountryDto_GetProvinces_Payload  = req.query
    try {

        const response = await Location__Service.countries_listProvinces(Number(countryId), payload)
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
}

export const addProvince = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {countryId, provinceId} = req.params
    try {

        const response = await Location__Service.countries_addProvince(Number(countryId), Number(provinceId))
        return res.status(204)

    } catch (e) {next(e)}
}
export const removeProvince = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {countryId, provinceId} = req.params
    try {

        const response = await Location__Service.countries_removeProvince(Number(countryId), Number(provinceId))
        return res.status(204)

    } catch (e) {next(e)}
}