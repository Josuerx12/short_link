import { InputParams } from 'src/core/shared/domain/abstracts/input-params';
import { OutputParams } from 'src/core/shared/domain/abstracts/output-params';
import { UserEntity } from '../entities/user.entity';
import { IBaseRepository } from 'src/core/shared/domain/contracts/base-repository.interface';
import { Transaction } from 'sequelize';

export type UserFilter = string;

export class UserInputParams extends InputParams<UserFilter> {}

export class UserOutputParams extends OutputParams<UserEntity> {}

export interface IUserRepository
  extends IBaseRepository<
    UserEntity,
    string,
    UserInputParams,
    UserOutputParams
  > {
  getByEmail(
    email: string,
    transaction?: Transaction,
  ): Promise<UserEntity | null>;
}
