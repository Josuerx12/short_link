import { AuthOutput } from 'src/core/auth/application/shared/auth.output';
import { UserPresenter } from '../users/user.presenter';

export class AuthPresenter {
  user: UserPresenter;
  accessToken: string;

  constructor(output: AuthOutput) {
    this.user = new UserPresenter(output.user);
    this.accessToken = output.accessToken;
  }
}
