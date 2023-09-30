import { Router, Request, Response } from 'express'
import {PartialErrors_type} from "../errors/PartialErrors";
import {ValidationErrorFilesLimit, ValidationErrorFilesType} from "../validators";
import usersRouter from './users'
import rolesRouter from './roles'

export type REQUEST = Request & {
    partialErrors?: PartialErrors_type
    filesErrors?: (ValidationErrorFilesType|ValidationErrorFilesLimit)[]
    //filesErrors?: ("UNEXPECTED_TYPE"|"MAX_SIZE"|"MAX_COUNT")[]
}

const router = Router()

router.get("/", async (req: Request,res: Response)=>{
    return res.json({
        name: "Bahram",
        lastName: "Askari"
    })
})

router.use(`/users`, usersRouter)
router.use(`/roles`, rolesRouter)



export default router