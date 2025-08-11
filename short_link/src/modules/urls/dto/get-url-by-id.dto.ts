import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetUrlByIdDto {
  @ApiProperty({
    description: 'The unique ID of the URL.',
    example: 'a1b2c3d4-e5f6-4890-1234-567890abcdef',
    format: 'uuid',
  })
  @IsUUID('4')
  id: string;
}
