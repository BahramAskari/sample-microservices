import { Request, Response, NextFunction } from 'express';
import {CustomError, NotFoundError, PartialErrors} from "../errors";
import {isEmpty} from "lodash";
import axios from "axios";
//import { CustomError } from './../models/custom-error.model';

function ErrorHandlerMiddleware(
    err: TypeError | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) {

    if (err instanceof CustomError)  {

        if (err instanceof PartialErrors || !isEmpty(PartialErrors.Errors)){
            return res.status(err.statusCode).send(err.serializeErrors())
            PartialErrors.Errors = []
        }


    return res.status(err.statusCode).send({
        error: true,
        code: err.statusCode,
        errors: err.serializeErrors().errors,
        //result: err.serializeErrors().result,
    });

    }

    if (axios.isAxiosError(err))  {
        return res.status(err.response.status).send(err.response.data)
    }

    console.log(err)
    return res.status(500).send({code: "SERVER_INTERNAL_ERROR"})

}

export default ErrorHandlerMiddleware;