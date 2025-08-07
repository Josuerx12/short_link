import { UserMapper } from 'src/core/user/domain/mappers/user.mapper';
import { UrlEntity } from '../entities/url.entity';
import { UserEntity } from 'src/core/user/domain/entities/user.entity';
import { CreateUrlDto } from 'src/modules/urls/dto/create-url.dto';
import { ShortUrlDto } from 'src/modules/urls/dto/short-url.dto';
import { ShowUrlDto } from 'src/modules/urls/dto/show-url.dto';

export class UrlMapper {
  static toEntity(dto: CreateUrlDto, code: string, userEntity?: UserEntity) {
    const entity = new UrlEntity();

    if (userEntity) {
      entity.user = userEntity;
    }

    entity.originalUrl = dto.originalUrl;
    entity.shortCode = code;
    entity.visitCount = 0;

    return entity;
  }

  static toShortUrl(entity: UrlEntity): ShortUrlDto {
    return {
      id: entity.id,
      originalUrl: entity.originalUrl,
      shortCode: entity.shortCode,
      visitCount: entity.visitCount,
      createdAt: entity.createdAt,
    };
  }

  static toShow(entity: UrlEntity): ShowUrlDto {
    const user = entity.user && UserMapper.toShow(entity.user);
    const visits = entity.visits;

    return {
      id: entity.id,
      originalUrl: entity.originalUrl,
      shortCode: entity.shortCode,
      visitCount: entity.visitCount,
      user,
      visits,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
