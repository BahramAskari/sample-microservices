import e, {NextFunction, Request, Response} from "express";
import {REQUEST} from "../../routes";
import * as mapper from './mapper'
import {
    TagDto_Create_Payload,
    TagDto_Update_Payload,
    TagDto_GetAll_Payload,
} from "../../Types/Dto/tags"
import {ValidateTagCreate} from "../../Validators/create/Tag";
import {FieldsValidation} from "../../errors/FieldsValidation";
import TagList from "../../Services/list/Tag";
import TagUpload from "../../Services/upload/Tag";
import {validateTag_find} from "../../Validators/find/Tag";
import TagDelete from "../../Services/delete/Tag";
import {ValidateTagUpdate} from "../../Validators/update/Tag";
import TagUpdate from "../../Services/update/Tag";
import TagFind from "../../Services/find/Tag";


/**
 * @Get All by filter
 */
export const getAll = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const filters: TagDto_GetAll_Payload = req.query
    try {
        console.log(`Route: Tags-GetAll`, 0)
        await TagList.list({filters}).then((items) => {
            return res.status(200).send({tags: items.rows, count: items.count})
        })

    } catch (e) {    next(e)     }
}

/**
 * @Get One
 */
export const getById = async (req: Request, res: Response, next: NextFunction)  => {
    const {id} = req.params
    try {
        // Begin Validation
        const validation = await validateTag_find(req.params)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation

        const result = await mapper.toTag(await TagFind.getById(Number(id)))
        return res.status(200).send({tag: result})

    } catch (e) {
        next(e)
    }
}

/**
 * Create
 */
export const create = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const payload: TagDto_Create_Payload = req.body
    try {
        // Begin Validation
        const validation = await ValidateTagCreate(payload)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation

        const result = await mapper.toTag(await TagUpload.create({...payload, CreatorId: payload.CreatorId}))
        return res.status(200).send(result)

    } catch (e) {
        next(e)
    }
}
/**
 * @Update One
 */
export const update = async (req: Request, res: Response, next: NextFunction)  => {
    const {id} = req.params
    const payload: TagDto_Update_Payload = req.body
    try {
        // Begin Validation
        const validation = await ValidateTagUpdate(payload)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation

        const result = await mapper.toTag(await TagUpdate.update(Number(id), payload))
        return res.status(200).send(result)

    } catch (e) {
        next(e)
    }
}

/**
 * @Delete One
 */
export const deleteById = async (req: Request, res: Response, next: NextFunction)  => {
    const {id} = req.params
    try {
        // Begin Validation
        const validation = await validateTag_find(req.params)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation

        const result =  mapper.toTagDelete(await TagDelete.deleteById(Number(id)))
        return res.status(200).send(result)

    } catch (e) {
       next(e)
    }
}