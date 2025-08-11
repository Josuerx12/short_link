/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const apiKey = this.configService.get<string>('API_KEY');

    const apiKeyFromHeaders = context.switchToHttp().getRequest().headers[
      'x-api-key'
    ];

    if (!apiKeyFromHeaders) {
      throw new UnauthorizedException();
    }

    if (apiKeyFromHeaders !== apiKey) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
