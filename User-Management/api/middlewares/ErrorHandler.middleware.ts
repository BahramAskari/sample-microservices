import { Request, Response, NextFunction } from 'express';
import {CustomError, PartialErrors} from "../errors";
import {isEmpty} from "lodash";

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

    console.log(err)
    return res.status(500).send(err)
    return res.status(500).send({
        error: true,
        code: 500,
        type: "server",
        message: "Server error occurred. Please try again a little bit later!",
        ...err
    })


}

export default ErrorHandlerMiddleware;