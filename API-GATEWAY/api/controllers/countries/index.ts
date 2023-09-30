import e, {NextFunction, Request, Response} from "express";
import * as mapper from './mapper'
import axios from "axios"
import {
    CountryDto_Create_Payload,
    CountryDto_Update_Payload,
    CountryDto_GetAll_Payload,
} from "../../types/Dto/countries"
import {REQUEST} from "../../routes";
import Location__Service from "../../services/Location";


/**
 * @Get All by filter
 */
export const getAll = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const filters: CountryDto_GetAll_Payload = req.query
    try {

        await Location__Service.countries_list(filters)
            .then((response) => {
                return res.status(200).send({countries: response.data.countries, count: response.data.count})
            })
            .catch( (e)=> {
                if (axios.isAxiosError(e)){
                    const {status: statusCode, data} = e.response
                    return res.status(statusCode).send(data)
                }
                // service is down?
                return res.status(505).send("Service is Down")
            })

    } catch (e) {next(e)}
}

/**
 * @Get One
 */
export const get = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {id} = req.params
    try {

        const response = await Location__Service.countries_get(Number(id))
        return res.status(200).send({country: response.data.country})

    } catch (e) {next(e)}
}

/**
 * Check
 */
export const slugAvailable = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {slug} = req.params
    try {

        const response = await Location__Service.countries_checkSlug(slug)
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
};
export const slugAvailableForCountry = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {countryId, slug} = req.params
    try {

        const response = await Location__Service.countries_checkSlugForCountry(Number(countryId), slug)
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
}

/**
 * Create
 */
export const create = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const payload:Omit<CountryDto_Create_Payload, "CreatorId"> = req.body
    try{

        const response = await Location__Service.countries_create({...payload, CreatorId: req.UserId})
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
}


/**
 * @Update One
 */
export const update = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {id} = req.params
    const payload:CountryDto_Update_Payload = req.body
    try {

        const response = await Location__Service.countries_update(Number(id), payload)
        return res.status(200).send(response.data)

    } catch (e) {
        console.log(e)
        next(e)
    }
}


/**
 * @Delete One
 */
export const deleteById = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {id} = req.params
    try {

        const response = await Location__Service.countries_delete(Number(id))
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
}