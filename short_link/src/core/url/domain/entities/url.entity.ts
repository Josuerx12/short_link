import { AbstractEntity } from 'src/core/shared/domain/abstracts/entity';
import { UrlVisit } from 'src/core/url-visits/domain/constracts/url-visit-gateway.interface';
import { UserEntity } from 'src/core/user/domain/entities/user.entity';
import { v4 } from 'uuid';

export type UrlEntityProps = {
  id?: string;
  userId?: string;
  originalUrl: string;
  shortCode: string;
  visitCount: number;
  user?: UserEntity;
  urlVisits?: UrlVisit[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
};

export class UrlEntity extends AbstractEntity {
  userId?: string;
  originalUrl: string;
  shortCode: string;
  visitCount: number;
  user?: UserEntity;
  urlVisits?: UrlVisit[];

  constructor(props: UrlEntityProps) {
    super();

    this.id = props.id || v4();
    this.userId = props.userId;
    this.originalUrl = props.originalUrl;
    this.shortCode = props.shortCode;
    this.visitCount = props.visitCount;
    this.user = props.user;
    this.urlVisits = props.urlVisits;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
    this.deletedAt = props.deletedAt;
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
