import {REQUEST} from "../../../routes";
import {NextFunction, Response} from "express";
import RoleList from "../../../services/list/Role";
import {validateUser_find} from "../../../validators/find/User";
import {FieldsValidation} from "../../../errors/FieldsValidation";
import {
    validateUser_addRole,
    validateUser_relateRoles,
    validateUser_removeRole
} from "../../../validators/associations/User";
import UserFind from "../../../services/find/User";
import {
    UserDto_GetRoles_Payload,
} from "../../../types/Dto/users/roles";



export const listRoles = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {userId} = req.params
    const payload: UserDto_GetRoles_Payload  = req.query
    try {

        // Begin Validation
        const validation = await validateUser_find({id: userId})
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        const item = await UserFind.getById(Number(userId))

        await RoleList.list({type: "user", itemId: Number(userId), filters: payload}).then((items) => {
            return res.status(200).send({roles: items.rows, count: items.count, item})
        })

    } catch (e) {next(e)}
}

export const addRole = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {userId, roleId} = req.params
    try {
        //  throw new Error()
        // Begin Validation
        const validation = await validateUser_addRole(req.params)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation

        const item = await UserFind.getById(Number(userId))
        await item.addRole(Number(roleId))

        //await UserAdd.role (Number(userId), Number(roleId), {individualHooks: true})
        return res.status(204)

    } catch (e) {next(e)}
}
export const removeRole = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {userId, roleId} = req.params
    try {
        //// ToDo Partial ->  throw new PartialErrors(["removeAssociation:NotExist"])
        //  throw new PartialErrors([{code: "removeAssociation:NotExist", item: "User", association: "Role", id: Number(roleId)}])
        // Begin Validation
        const validation = await validateUser_removeRole(req.params)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation

        const item = await UserFind.getById(Number(userId))
        await item.removeRole(Number(roleId))

        //await UserRemove.role (Number(userId), Number(roleId))
        return res.status(204)

    } catch (e) {next(e)}
}