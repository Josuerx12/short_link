import { UserEntity } from 'src/core/user/domain/entities/user.entity';
import { UserModel } from './user.model';

export class UserModelMapper {
  static toModel(entity: UserEntity): UserModel {
    return new UserModel({
      email: entity.email,
      name: entity.name,
      password: entity.password,
    });
  }

  static toEntity(model: UserModel): UserEntity {
    const entity = new UserEntity({
      id: model.id,
      email: model.email,
      name: model.name,
      password: model.password,
      createdAt: model.created_at,
      updatedAt: model.updated_at,
    });

    return entity;
  }
}
