import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetUrlByCodeDto {
  @ApiProperty({
    description: 'The unique short code of the URL to retrieve.',
    example: 'abcde',
    required: true,
  })
  @IsString()
  @IsOptional()
  code: string;

  @ApiPropertyOptional({
    description:
      'The IP address of the client accessing the URL. Used for analytics.',
    example: '192.168.1.1',
    required: false,
  })
  @IsOptional()
  @IsString()
  accessIp?: string;

  @ApiPropertyOptional({
    description:
      'The user-agent string of the client accessing the URL. Used for analytics.',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    required: false,
  })
  @IsOptional()
  @IsString()
  userAgent?: string;
}
