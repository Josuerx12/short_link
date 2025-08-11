import { CreateUrlDto } from './create-url.dto';
import { IsUUID } from 'class-validator';
import {
  ApiProperty,
  PartialType as SwaggerPartialType,
} from '@nestjs/swagger';

export class UpdateUrlDto extends SwaggerPartialType(CreateUrlDto) {}

export class UpdateUrlByIdDto {
  @ApiProperty({
    description: 'The unique ID of the URL to be updated, in UUIDv4 format.',
    example: 'a1b2c3d4-e5f6-4890-1234-567890abcdef',
    format: 'uuid',
  })
  @IsUUID('4')
  id: string;
}
