import { IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  login: string;

  @IsString()
  @MinLength(6)
  password: string;
}
