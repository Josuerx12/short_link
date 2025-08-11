import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlVisitsModule } from './url-visits/url-visits.module';
import { ShortUrlGatewayModule } from './gateways/short-url/short-url-gateway.module';
import { TokenGuard } from './guards/token/token.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
        auth: {
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASS'),
        },
      }),
      inject: [ConfigService],
    }),
    UrlVisitsModule,
    ShortUrlGatewayModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useFactory: (configService: ConfigService) =>
        new TokenGuard(configService),
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
