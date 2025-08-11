import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UrlVisitsService } from './url-visits.service';
import { CreateUrlVisitDto } from './dto/create-url-visit.dto';

@ApiTags('Url Visits')
@Controller('url-visits')
export class UrlVisitsController {
  constructor(private readonly urlVisitsService: UrlVisitsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new URL visit record' })
  @ApiResponse({
    status: 201,
    description: 'The URL visit has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createUrlVisitDto: CreateUrlVisitDto) {
    return this.urlVisitsService.create(createUrlVisitDto);
  }

  @Get('all-by-url/:urlId')
  @ApiOperation({ summary: 'Get all visits for a specific URL' })
  @ApiParam({
    name: 'urlId',
    required: true,
    description: 'The unique ID of the URL to retrieve visits for',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of URL visits for the specified URL.',
  })
  @ApiResponse({ status: 404, description: 'URL not found.' })
  findAll(@Param('urlId') urlId: string) {
    return this.urlVisitsService.findAllUrlVisits(urlId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single URL visit by its ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique ID of the visit record',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the single URL visit object.',
  })
  @ApiResponse({ status: 404, description: 'Visit not found.' })
  findOne(@Param('id') id: string) {
    return this.urlVisitsService.findOne(id);
  }
}
