import { HttpModule, HttpService } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { UrlVisitGateway } from 'src/core/url-visits/infra/gateways/url-visit.gateway';
import { UrlRepository } from 'src/core/url/infra/repositories/url.repository';
import { UrlsModule } from '../urls/urls.module';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [HttpModule, UrlsModule],
  providers: [
    {
      provide: UrlVisitGateway,
      useFactory: (
        configService: ConfigService,
        httpService: HttpService,
        urlRepository: UrlRepository,
      ) => new UrlVisitGateway(configService, httpService, urlRepository),
      inject: [ConfigService, HttpService, UrlRepository],
    },
  ],
  exports: [
    {
      provide: UrlVisitGateway,
      useFactory: (
        configService: ConfigService,
        httpService: HttpService,
        urlRepository: UrlRepository,
      ) => new UrlVisitGateway(configService, httpService, urlRepository),
      inject: [ConfigService, HttpService, UrlRepository],
    },
  ],
})
export class UrlVisitGatewayModule {}
