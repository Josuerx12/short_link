import { Inject, Injectable } from '@nestjs/common';
import { SignInDto } from '../users/dto/sign-in.dto';
import { SignInUseCase } from 'src/core/auth/application/use-cases/sign-in.use-case';

@Injectable()
export class AuthService {
  @Inject(SignInUseCase)
  signInUseCase: SignInUseCase;

  signIn(data: SignInDto) {
    return this.signInUseCase.execute(data);
  }
}
