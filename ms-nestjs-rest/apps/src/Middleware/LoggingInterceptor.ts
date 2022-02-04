import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger, Origin } from '../Config/LoggerConfig';

export interface Response<T> {
  response: T;
}

@Injectable()
export class LoggingInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    let origin: string = Origin.internal;
    let method: string = req.method;
    let domain: string = req.headers? req.headers.host : null;
    let endpoint: string = req.url;
    let headers: string = JSON.stringify(req.headers);
    let body: string = JSON.stringify(req.body);
    
    Logger.request.info(origin, method, domain, endpoint, body, headers);
    
    return next.handle().pipe(map(response => {

      let origin: string = Origin.internal
      let statusCode: number = res.statusCode
      let body: string = JSON.stringify(response)
      let header: string = headers
         
      Logger.response.info(origin, statusCode, body, header);
      return (response);
    }));
  }
}