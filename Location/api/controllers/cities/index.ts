import e, {NextFunction, Request, Response} from "express";
import {REQUEST} from "../../routes";
import * as mapper from './mapper'
import {
    CityDto_Create_Payload,
    CityDto_Update_Payload,
    CityDto_GetAll_Payload,
} from "../../types/Dto/cities"
import {FieldsValidation} from "../../errors/FieldsValidation";
import multer from "multer";
import path from "path";
import {randomUUID} from "crypto";
import {isBoolean, isEmpty, isNil, result} from "lodash";
import {validateCity_find} from "../../validators/find/City";
import CityFind from "../../services/find/City";
import CityList from "../../services/list/City";
import {
    ValidateCityUpdate,
} from "../../validators/update/City";
import {ValidateCityCreate} from "../../validators/create/City";
import CityUpload from "../../services/upload/City";
import CityUpdate from "../../services/update/City";
import CityDelete from "../../services/delete/City";




/**
 * @Get All by filter
 */
export const getAll = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const filters: CityDto_GetAll_Payload = req.query
    try {
        await CityList.list({filters}).then((items) => {
            return res.status(200).send({cities: items.rows, count: items.count})
        })

    } catch (e) {next(e)}
}


/**
 * @Get One
 */
export const get = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {id} = req.params
    try {
        // Begin Validation
        const validation = await validateCity_find(req.params)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        const result = await mapper.toCityWithAttached(await CityFind.getById(Number(id)))
        return res.status(200).send({city: result})

    } catch (e) {next(e)}
}

/**
 * Create
 */
export const create = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const payload:CityDto_Create_Payload = req.body
    try {
        // Begin Validation
        const validation = await ValidateCityCreate(payload)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        const result = await mapper.toCity(await CityUpload.create({...payload, CreatorId: payload.CreatorId}))
        return res.status(200).send(result)

    } catch (e) {
        console.log(e)
        next(e)
    }
}

/**
 * @Update One
 */
export const update = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {id} = req.params
    const payload:CityDto_Update_Payload = req.body
    try {
        // Begin Validation
        const validation = await ValidateCityUpdate({...payload, id})
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        const result = await mapper.toCity(await CityUpdate.update(Number(id), payload))
        return res.status(200).send(result)

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
        // Begin Validation
        const validation = await validateCity_find(req.params)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        const result =  mapper.toCityDelete(await CityDelete.deleteById(Number(id)))
        return res.status(200).send(result)

    } catch (e) {next(e)}
}