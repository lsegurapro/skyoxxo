import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConsumerModule } from '../src/ConsumerModule';

async function bootstrap() {
  const appMicro = await NestFactory.createMicroservice<MicroserviceOptions>( ConsumerModule, {
    logger: ['error', 'warn','log', 'debug'],
    transport: Transport.RMQ,
    options: {
        urls: [ process.env.RABBITMQ_URI ],
        queue: process.env.RABBIT_MQ_LOGGER_QUEUE,
        queueOptions: {
            durable: false
        },
    }
  });
  appMicro.useGlobalPipes(new ValidationPipe({transform: true}));
  await appMicro.listen(() => console.log('Microservice is listening'));
}

bootstrap();



 