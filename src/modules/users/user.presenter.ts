import { UserEntity } from 'src/core/user/domain/entities/user.entity';

export class UserPresenter {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(entity: UserEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.email = entity.email;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}
