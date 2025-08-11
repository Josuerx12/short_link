import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '../users/dto/sign-in.dto';
import { AuthPresenter } from './auth.presenter';
import { IsPublic } from 'src/core/auth/application/decorators/is-public.decorator';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Authentication')
@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @ApiOperation({ summary: 'Authenticate a user and get an access token' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({
    status: 200,
    description: 'User authenticated successfully.',
    schema: {
      properties: {
        accessToken: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
        user: {
          type: 'object',
          example: {
            id: 'a1b2c3d4-e5f6-4890-1234-567890abcdef',
            name: 'XPTO',
            email: 'email@example.com',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials.',
  })
  async signIn(@Body() data: SignInDto) {
    const result = await this.authService.signIn(data);
    return new AuthPresenter(result);
  }
}
