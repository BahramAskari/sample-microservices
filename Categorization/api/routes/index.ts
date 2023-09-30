import { Router, Request, Response } from 'express'
import {PartialErrors_type} from "../errors/PartialErrors";
import {ValidationErrorFilesLimit, ValidationErrorFilesType} from "../validators";

import tagsRouter from './tags'

export type REQUEST = Request & {
    partialErrors?: PartialErrors_type
    filesErrors?: (ValidationErrorFilesType|ValidationErrorFilesLimit)[]
}

const router = Router()

router.get("/", async (req: Request,res: Response)=>{
    return res.json({
        name: "Bahram",
        lastName: "Askari"
    })
})



/* Begin Categorization routes */
router.use(`/tags`, tagsRouter)
/* End Categorization routes */


export default router