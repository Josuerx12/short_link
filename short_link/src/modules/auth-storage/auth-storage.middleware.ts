import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthStorage } from 'src/core/shared/application/auth-storage';

@Injectable()
export class AuthStorageMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    AuthStorage.storage.run({}, () => {
      next();
    });
  }
}
