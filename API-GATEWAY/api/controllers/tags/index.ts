import e, {NextFunction, Request, Response} from "express";
import * as mapper from './mapper'
import axios from "axios"
import {
    TagDto_Create_Payload,
    TagDto_Update_Payload,
    TagDto_GetAll_Payload,
} from "../../types/Dto/tags"
import {REQUEST} from "../../routes";
import Categorization__Service from "../../services/Categorization";


/**
 * @Get All by filter
 */
export const getAll = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const filters: TagDto_GetAll_Payload = req.query
    try {

        await Categorization__Service.tags_list(filters)
            .then(({data}) => {
                console.log(`Success: \n`, data)
                return res.status(200).send({tags: data.tags, count: data.count})
            })
            .catch( (e)=> {
                console.log(`Error: \n`, e.message)
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

        const response = await Categorization__Service.tags_get(Number(id))
        return res.status(200).send({tag: response.data.tag})

    } catch (e) {next(e)}
}


/**
 * Create
 */
export const create = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const payload:Omit<TagDto_Create_Payload, "CreatorId"> = req.body
    try{

        const response = await Categorization__Service.tags_create({...payload, CreatorId: req.UserId})
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
}


/**
 * @Update One
 */
export const update = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {id} = req.params
    const payload:TagDto_Update_Payload = req.body
    try {

        const response = await Categorization__Service.tags_update(Number(id), payload)
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

        const response = await Categorization__Service.tags_delete(Number(id))
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
}