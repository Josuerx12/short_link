import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UrlVisitsService } from './url-visits.service';
import { CreateUrlVisitDto } from './dto/create-url-visit.dto';

@Controller('url-visits')
export class UrlVisitsController {
  constructor(private readonly urlVisitsService: UrlVisitsService) {}

  @Post()
  create(@Body() createUrlVisitDto: CreateUrlVisitDto) {
    return this.urlVisitsService.create(createUrlVisitDto);
  }

  @Get('all-by-url/:urlId')
  findAll(@Param('urlId') urlId: string) {
    return this.urlVisitsService.findAllUrlVisits(urlId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urlVisitsService.findOne(id);
  }
}
