import { AbstractEntity } from 'src/core/shared/domain/abstracts/entity';
import { UserEntity } from 'src/core/user/domain/entities/user.entity';

export type UrlEntityProps = {
  id: string;
  originalUrl: string;
  shortCode: string;
  visitCount: number;
  user: UserEntity;
  createdAt: Date;
  updatedAt: Date;
};

export class UrlEntity extends AbstractEntity {
  originalUrl: string;
  shortCode: string;
  visitCount: number;
  user: UserEntity;

  constructor(props: UrlEntityProps) {
    super();

    this.id = props.id;
    this.originalUrl = props.originalUrl;
    this.shortCode = props.shortCode;
    this.visitCount = props.visitCount;
    this.user = props.user;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  incrementVisitCount(): void {
    this.visitCount++;
  }

  static generateShortCode(size: number = 6): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortCode = '';

    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      shortCode += characters.charAt(randomIndex);
    }

    return shortCode;
  }
}
