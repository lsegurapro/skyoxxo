import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';
import { Logger } from '../../Config/LoggerConfig';
import RabbitMessageRequest from 'apps/src/Models/Request/RabbitMessageRequest';

@Injectable()
export class InterceptedAmqpConnection {
    readonly exchange = this._configService.get<string>('RABBITMQ_EXCHANGE_TEST');
    readonly key = this._configService.get<string>('RABBITMQ_EXCHANGE_TEST_TOPIC_KEY');

    constructor(
        private readonly _amqpConnection: AmqpConnection,
        private readonly _configService: ConfigService,
    ) { }

    async publish<T>(data: T, key:string=this.key): Promise<void> {


        const xProcontactoTraceId: string = JSON.stringify(Logger.getTraceId());
        const createdAt: Date = new Date();
        const app: string = this._configService.get('APP_NAME')
        const retry: number | null = null;

        Logger.message.info('Sending a message to rabbit');
        Logger.message.info(JSON.stringify(data));
        Logger.message.debug(JSON.stringify({exchange:this.exchange,key,xProcontactoTraceId, app,createdAt, retry}));
        return await this._amqpConnection.publish(
            this.exchange,
            key,
            RabbitMessageRequest.create<T>(xProcontactoTraceId, data, app, createdAt, retry)
        );
    }
}