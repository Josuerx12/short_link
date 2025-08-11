import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class CreateUrlDto {
  @ApiProperty({
    description:
      'The original URL to be shortened. It must be a valid URL format.',
    example: 'https://www.google.com',
  })
  @IsUrl()
  originalUrl: string;
}
