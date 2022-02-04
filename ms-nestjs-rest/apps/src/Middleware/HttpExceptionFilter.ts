import { Logger, Origin } from '../Config/LoggerConfig';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = host.switchToHttp().getRequest()

    const errorResponse = Object.assign(exception.getResponse(),{})

    const statusCode = exception.getStatus();
    const origin: string = Origin.internal
    const body: string = JSON.stringify(errorResponse)
    const header: string = JSON.stringify(req.headers);
    // const stack = exception.stack
    
    Logger.response.error(origin ,statusCode ,body ,header);    
    
    res
      .status(statusCode)
      .json(errorResponse);
  }
}