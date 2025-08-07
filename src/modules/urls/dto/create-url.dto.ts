import {
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsUUID,
  IsDateString,
} from 'class-validator';

export class CreateUrlDto {
  @IsUrl()
  originalUrl: string;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
