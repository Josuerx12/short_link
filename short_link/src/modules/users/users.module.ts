import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { USER_PROVIDERS } from './user.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/core/user/infra/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...Object.values(USER_PROVIDERS.REPOSITORIES),
    ...Object.values(USER_PROVIDERS.USE_CASES),
  ],
  exports: [...Object.values(USER_PROVIDERS.REPOSITORIES)],
})
export class UsersModule {}
