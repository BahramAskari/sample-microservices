import { CustomError } from "./CustomError";
export class ServerError extends CustomError {
    statusCode = 500;

    constructor(){
        super('Server has been downed for a second.');
        Object.setPrototypeOf(this, ServerError.prototype);
    }


    serializeErrors(): { errors: { message?: string; type?: string; field?: string; value?: string; validator?: string; args?: any[]; validatorArgs?: { min: any; max: any } }[]; partial?: { type: "alert"; result: {} | [] } } {
        return {
            errors: [
                {
                    message: "Serer error | Please try again"
                }
            ]
        };
    }

}