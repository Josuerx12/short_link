import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '../users/dto/sign-in.dto';
import { AuthPresenter } from './auth.presenter';
import { IsPublic } from 'src/core/auth/application/decorators/is-public.decorator';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() data: SignInDto) {
    const result = await this.authService.signIn(data);
    return new AuthPresenter(result);
  }
}
