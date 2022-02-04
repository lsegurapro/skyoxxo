import { HttpException, HttpStatus } from '@nestjs/common';
import {StatusCodeEnums, StatusCodeExceptionText} from "../Enums/StatusCodeEnums";

export default class HttpCustomException extends HttpException {
    errors: any;

    constructor(
        message: any,
        statusCode: number,
        errors?: any,
        statusText?: string,
        httpCode: number = HttpStatus.BAD_REQUEST,
    ) {
        super(
            HttpException.createBody(message, HttpCustomException.getStatusText(statusCode), statusCode),
            httpCode,
        );
        this.errors = errors;
    }

    static getStatusText(statusCode: StatusCodeEnums) {
        let text = StatusCodeExceptionText[statusCode];
        return text ? text : "Bad Request";
    }

    public static createHttpCustomExceptionFromError(error: any): HttpCustomException {
        const message: any = error.response.data?.message;
        const statusText: string = error.response.data?.error;
        const statusCode: number = error.response.data?.statusCode;
        const httpCode: number = error.response.status;
        const errors: any = error.response.data?.errors;
        return new HttpCustomException(message, statusCode, statusText, errors, httpCode);
    }
}
