import {REQUEST} from "../../../routes";
import {NextFunction, Response} from "express";
import UserList from "../../../services/list/User";
import {DeleteManyRolesDTO} from "../../../types/Dto/roles";
import {validateRole_find} from "../../../validators/find/Role";
import {FieldsValidation} from "../../../errors/FieldsValidation";
import {
    validateRole_addUser,
    validateRole_relateUsers,
    validateRole_removeUser
} from "../../../validators/associations/Role";
import RoleFind from "../../../services/find/Role";
import {
    RoleDto_GetUsers_Payload,
} from "../../../types/Dto/roles/users";



export const listUsers = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {roleId} = req.params
    const payload: RoleDto_GetUsers_Payload  = req.query
    try {

        // Begin Validation
        const validation = await validateRole_find({id: roleId})
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        const item = await RoleFind.getById(Number(roleId))

        await UserList.list({type: "role", itemId: Number(roleId), filters: payload}).then((items) => {
            return res.status(200).send({users: items.rows, count: items.count, item})
        })

    } catch (e) {next(e)}
}

export const addUser = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {roleId, userId} = req.params
    const payload:DeleteManyRolesDTO = req.body
    try {

        // Begin Validation
        const validation = await validateRole_addUser(req.params)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation

        const item = await RoleFind.getById(Number(roleId))
        await item.addUser(Number(userId))

        //await RoleAdd.user (Number(roleId), Number(userId), {individualHooks: true})
        return res.status(204)

    } catch (e) {next(e)}
}
export const removeUser = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {roleId, userId} = req.params
    try {

        // Begin Validation
        const validation = await validateRole_removeUser(req.params)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation

        const item = await RoleFind.getById(Number(roleId))
        await item.removeUser(Number(userId))

        //await RoleRemove.user (Number(roleId), Number(userId))
        return res.status(204)

    } catch (e) {next(e)}
}