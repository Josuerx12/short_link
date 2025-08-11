import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DeleteUrlByIdDto {
  @ApiProperty({
    description: 'The unique ID of the URL to be deleted.',
    example: 'a1b2c3d4-e5f6-4890-1234-567890abcdef',
    format: 'uuid',
  })
  @IsUUID('4')
  id: string;
}
