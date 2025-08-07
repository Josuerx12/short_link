import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UrlVisitsService } from './url_visits.service';
import { CreateUrlVisitDto } from './dto/create-url-visit.dto';
import { UpdateUrlVisitDto } from './dto/update-url-visit.dto';

@Controller('url-visits')
export class UrlVisitsController {
  constructor(private readonly urlVisitsService: UrlVisitsService) {}

  @Post()
  create(@Body() createUrlVisitDto: CreateUrlVisitDto) {
    return this.urlVisitsService.create(createUrlVisitDto);
  }

  @Get()
  findAll() {
    return this.urlVisitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urlVisitsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUrlVisitDto: UpdateUrlVisitDto,
  ) {
    return this.urlVisitsService.update(+id, updateUrlVisitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlVisitsService.remove(+id);
  }
}
