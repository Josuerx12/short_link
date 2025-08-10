import { PartialType } from '@nestjs/mapped-types';
import { CreateUrlDto } from './create-url.dto';
import { IsUUID } from 'class-validator';

export class UpdateUrlDto extends PartialType(CreateUrlDto) {}

export class UpdateUrlByIdDto {
  @IsUUID('4')
  id: string;
}
