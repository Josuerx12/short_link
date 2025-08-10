import { HttpModule, HttpService } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ShortUrlGateway } from 'src/url-visits/gateway/short-url.gateway';

@Global()
@Module({
  imports: [ConfigModule, HttpModule],
  providers: [
    {
      provide: ShortUrlGateway,
      useFactory: (httpService: HttpService, configService: ConfigService) =>
        new ShortUrlGateway(httpService, configService),
      inject: [ConfigService, HttpService],
    },
  ],
  exports: [
    {
      provide: ShortUrlGateway,
      useFactory: (httpService: HttpService, configService: ConfigService) =>
        new ShortUrlGateway(httpService, configService),
      inject: [ConfigService, HttpService],
    },
  ],
})
export class ShortUrlGatewayModule {}
