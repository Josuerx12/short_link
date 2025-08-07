import { CreateUrlVisitDto } from 'src/modules/url_visits/dto/create-url-visit.dto';
import { UrlEntity } from 'src/core/url/domain/entities/url.entity';
import { ShowUrlVisitDto } from 'src/modules/url_visits/dto/show-url-visit.dto';
import { UrlVisitEntity } from '../entities/url-visit.entity';

export class UrlVisitMapper {
  static toEntity(dto: CreateUrlVisitDto, urlEntity: UrlEntity): any {
    const entity = new UrlVisitEntity();

    entity.url = urlEntity;
    entity.ipAddress = dto.ipAddress;
    entity.userAgent = dto.userAgent;

    return entity;
  }

  static toShow(entity: UrlVisitEntity): ShowUrlVisitDto {
    return {
      id: entity.id,
      accessedAt: entity.accessedAt,
      ipAddress: entity.ipAddress,
      userAgent: entity.userAgent,
      url: entity.url,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
