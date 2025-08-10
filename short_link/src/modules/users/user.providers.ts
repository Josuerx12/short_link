import { getModelToken } from '@nestjs/sequelize';
import { ApplicationService } from 'src/core/shared/application/application.service';
import { CreateUserUseCase } from 'src/core/user/application/use-cases/create-user.use-case';
import { GetUserByIdUseCase } from 'src/core/user/application/use-cases/get-user-by-id.use-case';
import { UpdateUserUseCase } from 'src/core/user/application/use-cases/update-user.use-case';
import { UserModel } from 'src/core/user/infra/models/user.model';
import { UserRepository } from 'src/core/user/infra/repositories/user.repository';

const REPOSITORIES = {
  USER_REPOSITORY: {
    provide: 'UserRepository',
    useExisting: UserRepository,
  },

  USER_SEQUELIZE_REPOSITORY: {
    provide: UserRepository,
    useFactory: (userModel: typeof UserModel) => {
      return new UserRepository(userModel);
    },
    inject: [getModelToken(UserModel)],
  },
};

const USE_CASES = {
  GET_USER_BY_ID_USE_CASE: {
    provide: GetUserByIdUseCase,
    useFactory: (repository: UserRepository) => {
      return new GetUserByIdUseCase(repository);
    },
    inject: ['UserRepository'],
  },
  CREATE_USER_USE_CASE: {
    provide: CreateUserUseCase,
    useFactory: (
      appService: ApplicationService,
      repository: UserRepository,
    ) => {
      return new CreateUserUseCase(appService, repository);
    },
    inject: [ApplicationService, 'UserRepository'],
  },
  UPDATE_USER_USE_CASE: {
    provide: UpdateUserUseCase,
    useFactory: (
      appService: ApplicationService,
      repository: UserRepository,
    ) => {
      return new UpdateUserUseCase(appService, repository);
    },
    inject: [ApplicationService, 'UserRepository'],
  },
};

export const USER_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
};
