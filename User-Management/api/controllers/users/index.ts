import e, {NextFunction, Request, Response} from "express";
import * as mapper from './mapper'
import {
    UserDto_Create_Payload,
    DeleteMany_Users,
    UpdateMany_Users,
    UserDto_Update_Payload,
    UserDto_GetAll_Payload,
    UpdatePassword_User,
} from "../../types/Dto/users"
import {REQUEST} from "../../routes";
import {FieldsValidation} from "../../errors/FieldsValidation";
import {validateUser_find} from "../../validators/find/User";
import UserFind from "../../services/find/User";
import UserList from "../../services/list/User";
import {
    ValidateUserUpdate,
} from "../../validators/update/User";
import {
    ValidateUserCheckEmail,
    ValidateUserCheckEmailSync,
    ValidateUserCheckUsername,
    ValidateUserCheckUsernameSync
} from "../../validators/check/User";
import {ValidateUserCreate} from "../../validators/create/User";
import UserUpload from "../../services/upload/User";
import UserUpdate from "../../services/update/User";
import UserDelete from "../../services/delete/User";



/**
 * @Get All by filter
 */
export const getAll = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const filters: UserDto_GetAll_Payload = req.query
    try {
        await UserList.list({filters}).then((items) => {
            return res.status(200).send({users: items.rows, count: items.count})
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
        const validation = await validateUser_find(req.params)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        const result = await mapper.toUserWithAttached(await UserFind.getById(Number(id)))
        return res.status(200).send({user: result})

    } catch (e) {next(e)}
}

/**
 * Check
 */
export const usernameAvailable = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {username} = req.params
    try {

        const validation = await ValidateUserCheckUsername({username})
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        return res.status(200).send(true)

    } catch (e) {next(e)}
};
export const usernameAvailableForUser = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {userId, username} = req.params
    try {

        const validation = await ValidateUserCheckUsernameSync({id: userId, username})
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
       /*
            const exists = await UserCheck.existsByFieldExceptItem("username", username, Number(userId))
            if (exists) throw new FieldsValidation([{type: "unique", field:"username"}])
        */
        return res.status(200).send(true)

    } catch (e) {next(e)}
}
export const emailAvailable = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {email} = req.params
    try {

        const validation = await ValidateUserCheckEmail({email})
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        return res.status(200).send(true)

    } catch (e) {next(e)}
};
export const emailAvailableForUser = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {userId, email} = req.params
    try {

        const validation = await ValidateUserCheckEmailSync({id: userId, email})
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        return res.status(200).send(true)

    } catch (e) {next(e)}
}

/**
 * Create
 */
export const create = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const payload:UserDto_Create_Payload = req.body
    try {
        // Begin validation
        const validation = await ValidateUserCreate({...payload})
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation

        const result = await mapper.toUser(await UserUpload.create(payload))
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
        console.log(`Update user: `, req.path)
    const {id} = req.params
    const payload:UserDto_Update_Payload = req.body
    try {
        // Begin validation
        const validation = await ValidateUserUpdate({...payload, id})
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        // End validation

        const result = await mapper.toUser(await UserUpdate.update(Number(id), payload))
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
        // Begin validation
        // Begin Validation
        const validation = await validateUser_find(req.params)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        // End validation

        const result =  mapper.toUserDelete(await UserDelete.deleteById(Number(id)))
        return res.status(200).send(result)

    } catch (e) {next(e)}
}