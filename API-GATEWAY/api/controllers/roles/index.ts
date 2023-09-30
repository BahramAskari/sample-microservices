import e, {NextFunction, Request, Response} from "express";
import * as mapper from './mapper'
import axios from "axios"
import {
    RoleDto_Update_Payload,
    RoleDto_GetAll_Payload, RoleDto_Create_Payload,
} from "../../types/Dto/roles"
import {REQUEST} from "../../routes";
import fs from "fs";
import {DeleteMany, File_ListFilters} from "../../types";
import UserManagement__Service from "../../services/UserManagement";


/**
 * @Get All by filter
 */
export const getAll = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const filters: RoleDto_GetAll_Payload = req.query
    try {

        await UserManagement__Service.roles_list(filters)
            .then((response) => {
                return res.status(200).send({roles: response.data.roles, count: response.data.count})
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

        const response = await UserManagement__Service.roles_get(Number(id))
        return res.status(200).send({role: response.data.role})

    } catch (e) {next(e)}
}


/**
 * Create
 */
export const create = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const payload:Omit<RoleDto_Create_Payload, "CreatorId"> = req.body
    try{

        const response = await UserManagement__Service.roles_create({...payload, CreatorId: req.UserId})
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
}

/**
 * @Update One
 */
export const update = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {id} = req.params
    const payload:RoleDto_Update_Payload = req.body
    try {

        const response = await UserManagement__Service.roles_update(Number(id), payload)
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

        const response = await UserManagement__Service.roles_delete(Number(id))
        return res.status(200).send(response.data)

    } catch (e) {next(e)}
}