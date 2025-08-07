import { IsUUID, IsOptional, IsString, IsIP } from 'class-validator';

export class CreateUrlVisitDto {
  @IsUUID()
  urlId: string;

  @IsOptional()
  @IsIP()
  ipAddress?: string;

  @IsOptional()
  @IsString()
  userAgent?: string;
}
