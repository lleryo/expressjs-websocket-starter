import { Request, Response, NextFunction } from "express"


class CustomErrorHandler extends Error {
    statusCode: number;

    constructor(message:string, statusCode:number) {
        super(message);
        this.statusCode = statusCode;
    }
}



export const ErrorHandler = (error: CustomErrorHandler & Partial<Error>, request: Request, response: Response, next: NextFunction) => {
    console.log('Stack', error.stack)
}

