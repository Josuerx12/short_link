import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
      useFactory: (configService: ConfigService) => {
        console.log(configService.get<string>('DB_URI'));

        return {
          uri: configService.get<string>('DB_URI'),
          auth: {
            username: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASS'),
          },
        };
      },
      inject: [ConfigService],
    }),
    UrlVisitsModule,
    ShortUrlGatewayModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: APP_GUARD,
      useClass: TokenGuard,
    },
  ],
})
export class AppModule {}
