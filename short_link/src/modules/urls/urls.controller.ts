import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlByIdDto, UpdateUrlDto } from './dto/update-url.dto';
import { IsPublic } from 'src/core/auth/application/decorators/is-public.decorator';
import { GetAllUrlDto } from './dto/get-all-url.dto';
import { GetUrlByIdDto } from './dto/get-url-by-id.dto';
import { DeleteUrlByIdDto } from './dto/delete-url-by-id.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('URL Shortener')
@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @IsPublic()
  @Post()
  @ApiOperation({ summary: 'Create a new shortened URL' })
  @ApiBody({ type: CreateUrlDto })
  @ApiResponse({
    status: 201,
    description: 'The URL has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlsService.create(createUrlDto);
  }

  @Get('')
  @ApiOperation({
    summary: 'Retrieve a list of all URLs with optional filters',
  })
  @ApiQuery({
    name: 'filter',
    type: String,
    required: false,
    description: 'A filter string to search for specific URLs.',
  })
  @ApiQuery({
    name: 'page',
    type: String,
    required: false,
    description: 'The page number to retrieve.',
  })
  @ApiQuery({
    name: 'perPage',
    type: String,
    required: false,
    description: 'The number of items per page.',
  })
  @ApiQuery({
    name: 'sort',
    type: String,
    required: false,
    description: 'The property to sort by.',
  })
  @ApiQuery({
    name: 'sortDir',
    enum: ['asc', 'desc'],
    required: false,
    description: 'The sorting direction.',
  })
  @ApiResponse({ status: 200, description: 'A list of URLs.' })
  findAll(@Query() query: GetAllUrlDto) {
    return this.urlsService.findAll(query);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Retrieve a single URL by its UUID' })
  @ApiParam({
    name: 'id',
    type: String,
    format: 'uuid',
    description: 'The unique ID of the URL.',
  })
  @ApiResponse({ status: 200, description: 'The found URL.' })
  @ApiResponse({ status: 404, description: 'URL not found.' })
  findOne(@Param() param: GetUrlByIdDto) {
    return this.urlsService.findOne(param);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing URL by its UUID' })
  @ApiParam({
    name: 'id',
    type: String,
    format: 'uuid',
    description: 'The unique ID of the URL to update.',
  })
  @ApiBody({ type: UpdateUrlDto })
  @ApiResponse({
    status: 200,
    description: 'The URL has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'URL not found.' })
  update(@Param() param: UpdateUrlByIdDto, @Body() updateUrlDto: UpdateUrlDto) {
    return this.urlsService.update(param, updateUrlDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a URL by its UUID' })
  @ApiParam({
    name: 'id',
    type: String,
    format: 'uuid',
    description: 'The unique ID of the URL to delete.',
  })
  @ApiResponse({
    status: 200,
    description: 'The URL has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'URL not found.' })
  remove(@Param() param: DeleteUrlByIdDto) {
    return this.urlsService.remove(param);
  }
}
