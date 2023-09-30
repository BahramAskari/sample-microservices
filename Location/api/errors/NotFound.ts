import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
    statusCode = 404;
    private static errors: {field: string; value: number}[] = []

    constructor(parameters?: {field: string; value: number}[]){
        super('Route not found');
        if(parameters) {
            NotFoundError.errors.push(...parameters)
        }
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    // @ts-ignore
    serializeErrors(): { type: "NotFound"; errors: {field: string; value: number}[] } {
        return{
            type: "NotFound",
            errors:  [...(
                    NotFoundError.errors
                        .map(field=>
                            ({
                                ...field,
                            })
                        )
                )],
        }
    }

}