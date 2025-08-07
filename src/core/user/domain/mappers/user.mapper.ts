import { hashSync } from 'bcryptjs';
import { UserEntity } from 'src/core/user/domain/entities/user.entity';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { ShowUserDto } from 'src/modules/users/dto/show-user.dto';

export class UserMapper {
  static toEntity(dto: CreateUserDto): UserEntity {
    const entity = new UserEntity();

    entity.name = dto.name;
    entity.email = dto.email;
    entity.password = hashSync(dto.password, 10);

    return entity;
  }

  static toShow(entity: UserEntity): ShowUserDto {
    const urls = entity.urls;
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      urls,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
