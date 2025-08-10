import { Sequelize } from 'sequelize';
import { UserEntity } from 'src/core/user/domain/entities/user.entity';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().insert(null, 'users', {
    id: 'bba90da3-1738-4519-be8a-01df544fd236',
    name: 'JC DEV',
    email: 'jcdevvv@gmail.com',
    password: UserEntity.hashPassword('123456'),
    created_at: new Date(),
    updated_at: new Date(),
  });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().delete(null, 'users', {
    id: 'bba90da3-1738-4519-be8a-01df544fd236',
  });
};
