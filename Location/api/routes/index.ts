import { Router, Request, Response } from 'express'
import {PartialErrors_type} from "../errors/PartialErrors";
import {ValidationErrorFilesLimit, ValidationErrorFilesType} from "../validators";
import countriesRouter from './countries'
import provincesRouter from './provinces'
import citiesRouter from './cities'

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


/* Begin Location routes */
router.use(`/countries`, countriesRouter)
router.use(`/provinces`, provincesRouter)
router.use(`/cities`, citiesRouter)
/* End Location routes */


export default router