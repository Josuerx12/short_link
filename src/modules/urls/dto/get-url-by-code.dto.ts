import { IsString, Min } from 'class-validator';

export class GetUrlByCodeDto {
  @IsString()
  @Min(6)
  code: string;
}
