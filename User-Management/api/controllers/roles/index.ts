import e, {NextFunction, Request, Response} from "express";
import * as mapper from './mapper'
import {
    RoleDto_Create_Payload,
    RoleDto_Update_Payload,
    RoleDto_GetAll_Payload,
} from "../../types/Dto/roles"
import {FieldsValidation} from "../../errors/FieldsValidation";
import {validateRole_find} from "../../validators/find/Role";
import RoleList from "../../services/list/Role";
import {REQUEST} from "../../routes";
import RoleFind from "../../services/find/Role";
import RoleDelete from "../../services/delete/Role";
import RoleUpdate from "../../services/update/Role";
import RoleUpload from "../../services/upload/Role";
import {ValidateRoleCreate} from "../../validators/create/Role";




/**
 * @Get One
 */
export const get = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {id} = req.params
    try {

        // Begin Validation
        const validation = await validateRole_find(req.params)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation

        const result = await mapper.toRoleWithAttached(await RoleFind.getById(Number(id)))
        return res.status(200).send({role: result})

    } catch (e) {next(e)}
}
/**
 * @Get All by filter
 */
export const getAll = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const filters: RoleDto_GetAll_Payload = req.query
    try {
        await RoleList.list({filters}).then((items) => {
            return res.status(200).send({roles: items.rows, count: items.count})
        });

    } catch (e) {next(e)}
}


/**
 * Create
 */
export const create = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const payload:RoleDto_Create_Payload = req.body
    try {

        const validation = await ValidateRoleCreate(payload)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation

        const result = await mapper.toRole(await RoleUpload.create({...payload, CreatorId: payload.CreatorId}))
        return res.status(200).send(result)

    } catch (e) {next(e) }
}

/**
 * @Update One
 */
export const update = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {id} = req.params
    const payload:RoleDto_Update_Payload = req.body
    try {

        // Begin Validation
        const validation = await validateRole_find(req.params)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation

        const result = await mapper.toRole(await RoleUpdate.update(Number(id), payload))
        return res.status(200).send(result)

    } catch (e) {next(e)}
}

/**
 * @Delete One
 */
export const deleteById = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {id} = req.params
    try {

        // Begin Validation
        const validation = await validateRole_find(req.params)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation

        const result =  mapper.toRoleDelete(await RoleDelete.deleteById(Number(id)))
        return res.status(200).send(result)

    } catch (e) {next(e) }
}