import { CustomError } from "./CustomError";
export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    constructor() {
        super('Error connecting to database');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }


    serializeErrors(): { errors: { message?: string; type?: string; field?: string; value?: string; validator?: string; args?: any[]; validatorArgs?: { min: any; max: any } }[]; partial?: { type: "alert"; result: {} | [] } } {
        return {
            errors: [
                    {
                        message: "Error connecting to database",
                    },
            ]
        }
    }

}