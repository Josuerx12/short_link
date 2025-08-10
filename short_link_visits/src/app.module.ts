import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlVisitsModule } from './url-visits/url-visits.module';
import { ShortUrlGatewayModule } from './gateways/short-url/short-url-gateway.module';
import { TokenGuard } from './guards/token/token.guard';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/short_link_visits'),
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
