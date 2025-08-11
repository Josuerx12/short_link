import { UrlEntity } from '../../domain/entities/url.entity';

export type UrlOutput = {
  id: string;
  originalUrl: string;
  shortCode: string;
  visitCount: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
};

export class UrlOutputMapper {
  static toOutput(entity: UrlEntity): UrlOutput {
    return {
      id: entity.id,
      originalUrl: entity.originalUrl,
      shortCode: entity.shortCode,
      visitCount: entity.visitCount,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }
}
