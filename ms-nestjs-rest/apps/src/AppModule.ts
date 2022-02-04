import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConcessionaireModule } from './Modules/ConcessionaireModule';
import { ConfigModule } from '@nestjs/config';
import { nestEnvConfiguration } from './Config/NestEnvConfiguration';
import { ConfigService } from '@nestjs/config';
import { DBConfigInterface } from './Config/DBConfigInterface';
import { envFilePathConfiguration } from './Config/EnvFilePathConfiguration';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './Middleware/LoggingInterceptor';
import { QueryFailedErrorFilter } from './Middleware/QueryFailedErrorFilter';
import { HttpExceptionFilter } from './Middleware/HttpExceptionFilter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [envFilePathConfiguration()],
      load: [nestEnvConfiguration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => Object.assign(configService.get<DBConfigInterface>('DATABASE'))
    }),
    ConcessionaireModule
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_FILTER, useClass: QueryFailedErrorFilter },
    { provide: APP_FILTER, useClass: HttpExceptionFilter }
  ],
})
export class AppModule { 
  configure(consumer: MiddlewareConsumer) {

  }
}
