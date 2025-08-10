import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';

@Module({
  imports: [],
  controllers: [UrlsController],
  providers: [UrlsService],
})
export class UrlsModule {}
