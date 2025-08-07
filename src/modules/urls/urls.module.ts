import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from 'src/core/url/domain/entities/url.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UrlEntity])],
  controllers: [UrlsController],
  providers: [UrlsService],
})
export class UrlsModule {}
