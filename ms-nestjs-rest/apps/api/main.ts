import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/AppModule';
import * as helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions } from '@nestjs/swagger';
import * as rTracer from "@procontacto/cls-rtracer";
import { Logger } from '../src/Config/LoggerConfig';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import Page from '../src/Models/Response/Page';
import Response from '../src/Models/Response/Response';
import { swaggerUI } from './swagger-ui';
import PostalCodeHelper from 'apps/src/Helpers/SkyDropx/PostalCodeHelper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug'],
    // cors: {
    //   origin: 'http://localhost:3000',
    //   credentials: true,
    // },
  });

  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.use(helmet());
  app.use(rTracer.expressMiddleware({
    useHeader: true,
    headerName: 'X-Procontacto-Trace-Id'
  }));
  
  app.setGlobalPrefix('oxxo/api/v1.0');

  const config = new DocumentBuilder()
  .setTitle('Mechanical Service')
  .setDescription('API description')
  .setVersion('0.1')
  .build();

  const options: SwaggerDocumentOptions = {
    extraModels: [Page,Response]
  }

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      filter:true
    },
    customSiteTitle: 'Oxxo',
    customCss: swaggerUI
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs', app, document, customOptions);

  writeFileSync(
    resolve(__dirname, './api.json'),
    JSON.stringify(document, null, 2),
    {
      encoding: 'utf-8',
    },
  );

  const configService = app.get(ConfigService);
  PostalCodeHelper.initCpsFromFile()
  await app.listen(configService.get('PORT'));  
  Logger.message.info(`Listen to port: ` + configService.get('PORT'));
}

bootstrap();



