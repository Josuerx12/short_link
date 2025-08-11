import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { BullModule } from '@nestjs/bullmq';
import { URL_PROVIDERS } from './url.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import { UrlModel } from 'src/core/url/infra/models/url.model';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'urlVisits' }),
    SequelizeModule.forFeature([UrlModel]),
  ],
  controllers: [UrlsController],
  providers: [
    UrlsService,
    ...Object.values(URL_PROVIDERS.REPOSITORIES),
    ...Object.values(URL_PROVIDERS.USE_CASES),
    ...Object.values(URL_PROVIDERS.PROCESSORS),
  ],
  exports: [
    UrlsService,
    ...Object.values(URL_PROVIDERS.USE_CASES),
    ...Object.values(URL_PROVIDERS.REPOSITORIES),
  ],
})
export class UrlsModule {}
