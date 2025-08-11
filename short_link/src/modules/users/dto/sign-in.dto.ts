import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: "The user's username or email for signing in.",
    example: 'user123',
  })
  @IsString()
  login: string;

  @ApiProperty({
    description: "The user's password. It must be at least 6 characters long.",
    minLength: 6,
    example: 'password123',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
