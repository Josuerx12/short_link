import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: "The user's full name. Must be at least 2 characters long.",
    minLength: 2,
    example: 'John Doe',
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    description: "The user's email address. Must be a valid email format.",
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "The user's password. Must be at least 6 characters long.",
    minLength: 6,
    example: 'securePassword123',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
