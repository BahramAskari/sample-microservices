import e, {NextFunction, Request, Response} from "express";
import {REQUEST} from "../../routes";
import * as mapper from './mapper'
import {
    ProvinceDto_Create_Payload,
    DeleteManyProvincesDTO,
    ProvinceDto_Update_Payload,
    ProvinceDto_GetAll_Payload,
} from "../../types/Dto/provinces"
import {FieldsValidation} from "../../errors/FieldsValidation";
import multer from "multer";
import path from "path";
import {randomUUID} from "crypto";
import {isBoolean, isEmpty, isNil, result} from "lodash";
import {validateProvince_find} from "../../validators/find/Province";
import ProvinceFind from "../../services/find/Province";
import ProvinceList from "../../services/list/Province";
import {
    ValidateProvinceUpdate,
} from "../../validators/update/Province";
import {
    ValidateProvinceCheckProvinceSlug
} from "../../validators/check/Province";
import {ValidateProvinceCreate} from "../../validators/create/Province";
import ProvinceUpload from "../../services/upload/Province";
import ProvinceUpdate from "../../services/update/Province";
import ProvinceDelete from "../../services/delete/Province";


/**
 * @Get All by filter
 */
export const getAll = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const filters: ProvinceDto_GetAll_Payload = req.query
    try {
        await ProvinceList.list({filters}).then((items) => {
            return res.status(200).send({provinces: items.rows, count: items.count})
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
        const validation = await validateProvince_find(req.params)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        const result = await mapper.toProvinceWithAttached(await ProvinceFind.getById(Number(id)))
        return res.status(200).send({province: result})

    } catch (e) {next(e)}
}

/**
 * Check
 */
export const slugAvailable = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {slug} = req.params
    try {
        // Begin Validation
        const validation = await ValidateProvinceCheckProvinceSlug({slug})
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        return res.status(200).send(true)

    } catch (e) {next(e)}
};
/**
 * Create
 */
export const create = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const payload:ProvinceDto_Create_Payload = req.body
    try {
        // Begin Validation
        const validation = await ValidateProvinceCreate(payload)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        const result = await mapper.toProvince(await ProvinceUpload.create({...payload, CreatorId: payload.CreatorId}))
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
    const payload:ProvinceDto_Update_Payload = req.body
    try {
        // Begin Validation
        const validation = await ValidateProvinceUpdate({...payload, id})
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        const result = await mapper.toProvince(await ProvinceUpdate.update(Number(id), payload))
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
        const validation = await validateProvince_find(req.params)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        const result =  mapper.toProvinceDelete(await ProvinceDelete.deleteById(Number(id)))
        return res.status(200).send(result)

    } catch (e) {next(e)}
}