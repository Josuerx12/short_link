import { Module } from '@nestjs/common';
import { UrlVisitsService } from './url-visits.service';
import { UrlVisitsController } from './url-visits.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlVisicSchema, UrlVisit } from './models/url-visit.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UrlVisit.name, schema: UrlVisicSchema },
    ]),
  ],
  controllers: [UrlVisitsController],
  providers: [UrlVisitsService],
})
export class UrlVisitsModule {}
