import { Payload } from '@nestjs/microservices';
import { TransactionService } from '../Services/TransactionService';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import RabbitMessageRequest from '../Models/Request/RabbitMessageRequest';
import { Logger } from '../Config/LoggerConfig';
import { TransactionEntity } from '../Models/Entities/TransactionEntity';

const EXCHANGE = 'TEST';
const TOPIC_KEY = 'mq.key.concessionaire.notify.transaction';
const QUEUE = 'QUEUE_CONCESSIONAIRE';

@Injectable()
export class TransactionConsumer {
  constructor(
    private readonly _transactionService: TransactionService
    ) {}

  @RabbitSubscribe({
    exchange: EXCHANGE,
    routingKey: TOPIC_KEY,
    queue: QUEUE,
  })
  async handleCreatedTransaction(@Payload() message: RabbitMessageRequest<TransactionEntity>) {
    Logger.message.info(`get message ${JSON.stringify(message.data)} from queue: ${QUEUE} with topic: ${TOPIC_KEY}`);
    this._transactionService.notifyTrx(message.data);
    return;
  }

}
