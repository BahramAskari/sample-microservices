import e, {NextFunction, Request, Response} from "express";
import * as mapper from './mapper'
import axios from "axios"
import {
    ProvinceDto_Create_Payload,
    ProvinceDto_Update_Payload,
    ProvinceDto_GetAll_Payload,
} from "../../types/Dto/provinces"
import {REQUEST} from "../../routes";
import Location__Service from "../../services/Location";


/**
 * @Get All by filter
 */
export const getAll = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const filters: ProvinceDto_GetAll_Payload = req.query
    try {

        await Location__Service.provinces_list(filters)
            .then((response) => {
                return res.status(200).send({provinces: response.data.provinces, count: response.data.count})
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

        const response = await Location__Service.provinces_get(Number(id))
        return res.status(200).send({province: response.data.province})

    } catch (e) {next(e)}
}

/**
 * Check
 */
export const slugAvailable = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {slug} = req.params
    try {

        const response = await Location__Service.provinces_checkSlug(slug)
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
};
export const slugAvailableForProvince = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {provinceId, slug} = req.params
    try {

        const response = await Location__Service.provinces_checkSlugForProvince(Number(provinceId), slug)
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
}

/**
 * Create
 */
export const create = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const payload:Omit<ProvinceDto_Create_Payload, "CreatorId"> = req.body
    try{

        const response = await Location__Service.provinces_create({...payload, CreatorId: req.UserId})
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
}


/**
 * @Update One
 */
export const update = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {id} = req.params
    const payload:ProvinceDto_Update_Payload = req.body
    try {

        const response = await Location__Service.provinces_update(Number(id), payload)
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

        const response = await Location__Service.provinces_delete(Number(id))
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
}