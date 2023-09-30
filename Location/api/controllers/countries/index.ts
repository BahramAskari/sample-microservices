import e, {NextFunction, Request, Response} from "express";
import {REQUEST} from "../../routes";
import * as mapper from './mapper'
import {
    CountryDto_Create_Payload,
    CountryDto_Update_Payload,
    CountryDto_GetAll_Payload,
} from "../../types/Dto/countries"
import {FieldsValidation} from "../../errors/FieldsValidation";
import multer from "multer";
import path from "path";
import fs from "fs";
import ImageSize from "image-size";
import {randomUUID} from "crypto";
import {isBoolean, isEmpty, isNil, result} from "lodash";
import {validateCountry_find} from "../../validators/find/Country";
import CountryFind from "../../services/find/Country";
import CountryList from "../../services/list/Country";
import {
    ValidateCountryUpdate,
} from "../../validators/update/Country";
import {ValidateCountryCreate} from "../../validators/create/Country";
import CountryUpload from "../../services/upload/Country";
import CountryCheck from "../../services/check/Country";
import CountryUpdate from "../../services/update/Country";
import CountryDelete from "../../services/delete/Country";
import {stringToArray, stringToBoolean} from "../../../lib/functions/HotFunctions";
import {
    ValidateCountryCheckCountrySlug,
} from "../../validators/check/Country";



/**
 * Multer for flag
 */
// SET Cover's STORAGE
const flagTempStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'private/temp/country-flag/')
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.originalname.substring(0 , file.originalname.indexOf(path.extname(file.originalname)) )
            + `-` + randomUUID() + '-' + Date.now() + path.extname(file.originalname)
        )
    },
})
let uploadFlag = multer({ storage: flagTempStorage,
    limits: {
        fileSize: 3670016,     //  3.5 MB
    },
    fileFilter(req: e.Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
        if (!file.mimetype.startsWith("image/")){
            callback(null, false)
        }
        callback(null, true)
    }
})

/**
 * Multer for cover
 */
// SET Cover's STORAGE
const coverTempStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'private/temp/country-cover/')
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.originalname.substring(0 , file.originalname.indexOf(path.extname(file.originalname)) )
            + `-` + randomUUID() + '-' + Date.now() + path.extname(file.originalname)
        )
    },
})
let uploadCover = multer({ storage: coverTempStorage,
    limits: {
        fileSize: 3670016,     //  3.5 MB
    },
    fileFilter(req: e.Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
        if (!file.mimetype.startsWith("image/")){
            callback(null, false)
        }
        callback(null, true)
    }
})


/**
 * @Get All by filter
 */
export const getAll = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const filters: CountryDto_GetAll_Payload = req.query
    try {
        await CountryList.list({filters}).then((items) => {
            return res.status(200).send({countries: items.rows, count: items.count})
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
        const validation = await validateCountry_find(req.params)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        const result = await mapper.toCountryWithAttached(await CountryFind.getById(Number(id)))
        return res.status(200).send({country: result})

    } catch (e) {next(e)}
}

/**
 * Check
 */
export const slugAvailable = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const {slug} = req.params
    try {
        // Begin Validation
        const validation = await ValidateCountryCheckCountrySlug({slug})
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        return res.status(200).send(true)

    } catch (e) {next(e)}
};
/**
 * Create
 */
export const create = async (req: REQUEST, res: Response, next: NextFunction)  => {
    const payload:CountryDto_Create_Payload = req.body
    try {
        // Begin Validation
        const validation = await ValidateCountryCreate(payload)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        const result = await mapper.toCountry(await CountryUpload.create({...payload, CreatorId: payload.CreatorId}))
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
    const {id} = req.params
    const payload:CountryDto_Update_Payload = req.body
    try {
        // Begin Validation
        const validation = await ValidateCountryUpdate({...payload, id})
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        const result = await mapper.toCountry(await CountryUpdate.update(Number(id), payload))
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
        // Begin Validation
        const validation = await validateCountry_find(req.params)
        if (validation !== true) throw new FieldsValidation(validation)
        // End Validation
        const result =  mapper.toCountryDelete(await CountryDelete.deleteById(Number(id)))
        return res.status(200).send(result)

    } catch (e) {next(e)}
}