/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { AsyncLocalStorage } from 'async_hooks';
import { UserEntity } from 'src/core/user/domain/entities/user.entity';

interface IAuthStorage {
  user?: UserEntity | null;
}

export const AuthStorage = {
  storage: new AsyncLocalStorage<IAuthStorage>(),
  get(): IAuthStorage {
    return this.storage.getStore();
  },

  set(payload: IAuthStorage) {
    return this.storage.enterWith(payload);
  },
};
