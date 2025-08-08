import { compareSync, hashSync } from 'bcryptjs';
import { AbstractEntity } from 'src/core/shared/domain/abstracts/entity';
import { UrlEntity } from 'src/core/url/domain/entities/url.entity';
import { v4 } from 'uuid';

export type UserEntityProps = {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class UserEntity extends AbstractEntity {
  name: string;
  email: string;
  password: string;
  urls?: UrlEntity[];

  constructor(props: UserEntityProps) {
    super();
    this.id = props.id || v4();
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }

  static hashPassword(password: string): string {
    return hashSync(password, 10);
  }

  comparePassword(password: string): boolean {
    return compareSync(password, this.password);
  }
}
