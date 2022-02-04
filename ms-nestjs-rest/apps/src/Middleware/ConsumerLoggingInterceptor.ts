import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SimpleInnerSubscriber } from 'rxjs/internal/innerSubscribe';
import { catchError, map } from 'rxjs/operators';
import { Logger } from '../Config/LoggerConfig';
import EnumHttpCodes from '../Enums/EnumHttpCodes';
import RabbitMessageRequest from '../Models/Request/RabbitMessageRequest';
import ErrorResponse from '../Models/Response/ErrorResponse';
import * as rTracer from "@procontacto/cls-rtracer";
import { ConsumeMessage } from 'amqplib';
export interface Response<T> {
  response: T;
}

@Injectable()
export class ConsumerLoggingInterceptor<T> implements NestInterceptor<T, Response<T>> {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<Response<T>>> {

    let communicationInformation: ConsumeMessage = context.getArgs()[1];
    let message: RabbitMessageRequest<object> = context.getArgs()[0];
    let executionResult: Observable<any>;
    
    rTracer.set(message.xProcontactoTraceId);
    
    Logger.message.info(JSON.stringify(message));
    Logger.message.info(JSON.stringify(communicationInformation.properties));

    executionResult = next.handle().pipe(
      map(response => {
        Logger.message.info(JSON.stringify(response));
        return (response);
      }),
      catchError(
        (err: Error, caught: Observable<any>) => new Observable(
          (observer: SimpleInnerSubscriber<any>) => {
            const name: string = err.name;
            const message: string = err.message;
            const errorResponse: ErrorResponse = ErrorResponse.create(EnumHttpCodes.INTERNAL_SERVER_ERROR, message, name);
            Logger.message.error(JSON.stringify(errorResponse));
            observer.complete()
          })
      ),
    );
    return executionResult
  }
}