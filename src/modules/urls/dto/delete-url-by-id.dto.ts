import { IsUUID } from 'class-validator';

export class DeleteUrlByIdDto {
  @IsUUID('4')
  id: string;
}
