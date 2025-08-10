import { IsUUID } from 'class-validator';

export class GetUrlByIdDto {
  @IsUUID('4')
  id: string;
}
