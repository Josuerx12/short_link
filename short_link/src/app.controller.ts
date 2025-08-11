import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { UrlsService } from './modules/urls/urls.service';
import express from 'express';
import { IsPublic } from './core/auth/application/decorators/is-public.decorator';
import { GetUrlByCodeDto } from './modules/urls/dto/get-url-by-code.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('API Status & Redirections')
@Controller()
export class AppController {
  constructor(private readonly urlService: UrlsService) {}

  @IsPublic()
  @Get('status')
  @ApiOperation({ summary: 'Check the API status' })
  @ApiResponse({ status: 200, description: 'The API is running successfully.' })
  checkStatus() {
    return { status: 'ok', message: 'API is running' };
  }

  @IsPublic()
  @Get('redirect/:code')
  @ApiOperation({ summary: 'Redirect a short URL to its original URL' })
  @ApiParam({
    name: 'code',
    type: String,
    description: 'The unique short code of the URL.',
    example: 'abcde',
  })
  @ApiQuery({
    name: 'accessIp',
    type: String,
    required: false,
    description: 'The IP address of the client.',
    example: '192.168.1.1',
  })
  @ApiQuery({
    name: 'userAgent',
    type: String,
    required: false,
    description: 'The user-agent string of the client.',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  })
  @ApiResponse({ status: 302, description: 'Redirects to the original URL.' })
  @ApiResponse({ status: 404, description: 'URL not found.' })
  async redirect(
    @Query() query: GetUrlByCodeDto,
    @Param('code') code: string,
    @Res() res: express.Response,
  ) {
    query.code = code;

    console.log(query);

    const url = await this.urlService.findOneByCode(query);

    return res.redirect(url.originalUrl);
  }
}
