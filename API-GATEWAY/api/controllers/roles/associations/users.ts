import {REQUEST} from "../../../routes";
import {NextFunction, Response} from "express";
import {
    RoleDto_GetUsers_Payload,
} from "../../../types/Dto/roles/users";
import UserManagement__Service from "../../../services/UserManagement";



export const listUsers = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {roleId} = req.params
    const payload: RoleDto_GetUsers_Payload  = req.query
    try {

        const response = await UserManagement__Service.roles_listUsers(Number(roleId), payload)
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
}

export const addUser = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {roleId, userId} = req.params
    try {

        const response = await UserManagement__Service.roles_addUser(Number(roleId), Number(userId))
        return res.status(204)

    } catch (e) {next(e)}
}
export const removeUser = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {roleId, userId} = req.params
    try {

        const response = await UserManagement__Service.roles_removeUser(Number(roleId), Number(userId))
        return res.status(204)

    } catch (e) {next(e)}
}