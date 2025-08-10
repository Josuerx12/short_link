import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthStorage } from 'src/core/shared/application/auth-storage';
import { UserRepository } from 'src/core/user/infra/repositories/user.repository';
import { IUserRepository } from 'src/core/user/domain/contracts/user-repository.interface';
import { UserModel } from 'src/core/user/infra/models/user.model';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/core/auth/application/decorators/is-public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  private userRepository: IUserRepository;
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.userRepository = new UserRepository(UserModel);
  }
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      if (!payload.sub) {
        throw new UnauthorizedException();
      }

      const user = await this.userRepository.getById(payload.sub);

      if (!user) {
        throw new UnauthorizedException();
      }

      AuthStorage.set({ user });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
