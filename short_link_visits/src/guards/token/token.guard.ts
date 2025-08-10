/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const apiKey = context.switchToHttp().getRequest().headers['x-api-key'];

    if (!apiKey) {
      throw new UnauthorizedException();
    }

    if (apiKey !== process.env.API_KEY) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
