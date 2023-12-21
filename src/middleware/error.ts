import { Request, Response, NextFunction } from "express"


class CustomErrorHandler extends Error {
    statusCode: number;

    constructor(message:string, statusCode:number) {
        super(message);
        this.statusCode = statusCode;
    }
}



export const ErrorHandler = (error: CustomErrorHandler & Partial<Error>, _request: Request, _response: Response, _next: NextFunction) => {
    console.log('Stack', error.stack)
}

