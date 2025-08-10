import { IUseCase } from 'src/core/shared/domain/contracts/use-case.interface';
import { SignInDto } from 'src/modules/users/dto/sign-in.dto';
import { AuthOutput } from '../shared/auth.output';
import { IUserRepository } from '../../../user/domain/contracts/user-repository.interface';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

export class SignInUseCase implements IUseCase<SignInDto, AuthOutput> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: SignInDto) {
    const user = await this.userRepository.getByEmail(input.login);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    if (!user.comparePassword(input.password)) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const token = this.jwtService.sign({ sub: user.id });

    return {
      accessToken: token,
      user,
    };
  }
}
