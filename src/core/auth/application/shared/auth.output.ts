import { UserEntity } from '../../../user/domain/entities/user.entity';

export class AuthOutput {
  accessToken: string;
  user: UserEntity;
}
