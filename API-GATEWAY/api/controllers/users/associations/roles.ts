import {REQUEST} from "../../../routes";
import {NextFunction, Response} from "express";
import {
    UserDto_GetRoles_Payload,
} from "../../../types/Dto/users/roles";
import UserManagement__Service from "../../../services/UserManagement";



export const listRoles = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {userId} = req.params
    const payload: UserDto_GetRoles_Payload  = req.query
    try {

        const response = await UserManagement__Service.users_listRoles(Number(userId), payload)
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
}

export const addRole = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {userId, roleId} = req.params
    try {

        const response = await UserManagement__Service.users_addRole(Number(userId), Number(roleId))
        return res.status(204)

    } catch (e) {next(e)}
}
export const removeRole = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {userId, roleId} = req.params
    try {

        const response = await UserManagement__Service.users_removeRole(Number(userId), Number(roleId))
        return res.status(204)

    } catch (e) {next(e)}
}