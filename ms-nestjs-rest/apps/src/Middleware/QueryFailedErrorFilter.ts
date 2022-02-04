import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';
import ErrorResponse from '../Models/Response/ErrorResponse';
import { Logger } from '../Config/LoggerConfig';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch(QueryFailedError)
export class QueryFailedErrorFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {

    const ctx: HttpArgumentsHost = host.switchToHttp();
    const res: Response = ctx.getResponse<Response>();
    const req = host.switchToHttp().getRequest()

    const name: string = exception.name;
    const message: string = exception.message;
    const errorResponse: ErrorResponse = ErrorResponse.create(res.statusCode, message, name);
    
    const statusCode: number = res.statusCode;
    let body: string = JSON.stringify(errorResponse);
    const header: string = JSON.stringify(req.headers);
    // const stack = exception.stack

    Logger.response.error(origin ,statusCode ,body ,header);

    res
      .status(statusCode)
      .json(errorResponse);
  }
}