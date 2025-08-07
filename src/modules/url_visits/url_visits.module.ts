import { Module } from '@nestjs/common';
import { UrlVisitsService } from './url_visits.service';
import { UrlVisitsController } from './url_visits.controller';

@Module({
  controllers: [UrlVisitsController],
  providers: [UrlVisitsService],
})
export class UrlVisitsModule {}
