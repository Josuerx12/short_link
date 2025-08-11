import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetAllUrlDto {
  @ApiProperty({
    description: 'A filter string to search for specific URLs.',
    required: false,
    example: 'google',
  })
  @IsOptional()
  @IsString()
  filter?: string;

  @ApiProperty({
    description: 'The page number to retrieve.',
    required: false,
    example: '1',
  })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiProperty({
    description: 'The number of items per page.',
    required: false,
    example: '10',
  })
  @IsOptional()
  @IsNumberString()
  perPage?: string;

  @ApiProperty({
    description: 'The property to sort by (e.g., "createdAt", "originalUrl").',
    required: false,
    example: 'createdAt',
  })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiProperty({
    description: 'The sorting direction.',
    required: false,
    enum: ['asc', 'desc'],
    example: 'desc',
  })
  @IsOptional()
  @IsString()
  sortDir?: 'asc' | 'desc';
}
