import e, {NextFunction, Request, Response} from "express";
import * as mapper from './mapper'
import axios from "axios"
import {
    CityDto_Create_Payload,
    CityDto_Update_Payload,
    CityDto_GetAll_Payload,
} from "../../types/Dto/cities"
import {REQUEST} from "../../routes";
import Location__Service from "../../services/Location";


/**
 * @Get All by filter
 */
export const getAll = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const filters: CityDto_GetAll_Payload = req.query
    try {

        await Location__Service.cities_list(filters)
            .then((response) => {
                return res.status(200).send({cities: response.data.cities, count: response.data.count})
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

        const response = await Location__Service.cities_get(Number(id))
        return res.status(200).send({city: response.data.city})

    } catch (e) {next(e)}
}

/**
 * Create
 */
export const create = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const payload:Omit<CityDto_Create_Payload, "CreatorId"> = req.body
    try{

        const response = await Location__Service.cities_create({...payload, CreatorId: req.UserId})
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
}


/**
 * @Update One
 */
export const update = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {id} = req.params
    const payload:CityDto_Update_Payload = req.body
    try {

        const response = await Location__Service.cities_update(Number(id), payload)
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

        const response = await Location__Service.cities_delete(Number(id))
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
}