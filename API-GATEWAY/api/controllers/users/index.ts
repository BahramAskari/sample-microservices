import e, {NextFunction, Request, Response} from "express";
import * as mapper from './mapper'
import axios from "axios"
import {
    UserDto_Create_Payload,
    UserDto_Update_Payload,
    UserDto_GetAll_Payload,
} from "../../types/Dto/users"
import {REQUEST} from "../../routes";
import UserManagement__Service from "../../services/UserManagement";


/**
 * @Get All by filter
 */
export const getAll = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const filters: UserDto_GetAll_Payload = req.query
    try {

        await UserManagement__Service.users_list(filters)
            .then((response) => {
            return res.status(200).send({users: response.data.users, count: response.data.count})
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

        const response = await UserManagement__Service.users_get(Number(id))
        return res.status(200).send({user: response.data.user})

    } catch (e) {next(e)}
}

/**
 * Check
 */
export const usernameAvailable = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {username} = req.params
    try {

        const response = await UserManagement__Service.users_checkUsername(username)
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
};

export const usernameAvailableForUser = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {userId, username} = req.params
    try {

        const response = await UserManagement__Service.users_checkUsernameForUser(Number(userId), username)
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
}

export const emailAvailable = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {email} = req.params
    try {

        const response = await UserManagement__Service.users_checkEmail(email)
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
};

export const emailAvailableForUser = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {userId, email} = req.params
    try {

        const response = await UserManagement__Service.users_checkEmailForUser(Number(userId), email)
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
}

/**
 * Create
 */
export const create = async (req: REQUEST, res: Response, next: NextFunction)  => {

    let payload:Omit<UserDto_Create_Payload, "CreatorId"> = req.body
    try{

        const response = await UserManagement__Service.users_create({...payload, CreatorId: req.UserId})
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
}

/**
 * @Update One
 */
export const update = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {id} = req.params
    const payload:UserDto_Update_Payload = req.body
    try {

        const response = await UserManagement__Service.users_update(Number(id), payload)
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

        const response = await UserManagement__Service.users_delete(Number(id))
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
}