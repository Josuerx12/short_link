import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUrlVisitDto {
  @IsUUID('4')
  urlId: string;

  @IsDateString()
  accessedAt: string;

  @IsString()
  @IsOptional()
  ip?: string;

  @IsString()
  @IsOptional()
  userAgent?: string;
}
