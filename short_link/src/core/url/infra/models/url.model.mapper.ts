import { UserModelMapper } from 'src/core/user/infra/models/user.model.mapper';
import { UrlEntity } from '../../domain/entities/url.entity';
import { UrlModel } from './url.model';

export class UrlModelMapper {
  static toModel(entity: UrlEntity): UrlModel {
    return UrlModel.build({
      id: entity.id,
      user_id: entity.userId,
      original_url: entity.originalUrl,
      short_code: entity.shortCode,
      visit_count: entity.visitCount,
    });
  }

  static toEntity(model: UrlModel): UrlEntity {
    const entity = new UrlEntity({
      id: model.id,
      userId: model.user_id,
      originalUrl: model.original_url,
      shortCode: model.short_code,
      visitCount: model.visit_count,
      user: model.user && UserModelMapper.toEntity(model.user),
    });

    return entity;
  }
}
