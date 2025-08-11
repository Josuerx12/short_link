import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlVisitDto {
  @ApiProperty({
    description: 'The unique ID of the URL that was visited.',
    example: 'a1b2c3d4-e5f6-4a7b-9c8d-1e2f3a4b5c6d',
    format: 'uuid',
  })
  @IsUUID('4')
  urlId: string;

  @ApiProperty({
    description: 'The timestamp when the URL was accessed (ISO 8601 format).',
    example: '2025-08-11T19:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsDateString()
  accessedAt: string;

  @ApiProperty({
    description: 'The IP address of the user who visited the URL.',
    example: '192.168.1.100',
    required: false,
  })
  @IsString()
  @IsOptional()
  ip?: string;

  @ApiProperty({
    description: 'The User-Agent string from the client’s browser.',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    required: false,
  })
  @IsString()
  @IsOptional()
  userAgent?: string;
}
