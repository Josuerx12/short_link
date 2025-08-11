import { Op, Transaction } from 'sequelize';
import {
  IUrlRepository,
  UrlInputParams,
  UrlOutputParams,
} from '../../domain/contracts/url-repository.interface';
import { UrlEntity } from '../../domain/entities/url.entity';
import { UrlModel } from '../models/url.model';
import { UrlModelMapper } from '../models/url.model.mapper';
import { AuthStorage } from 'src/core/shared/application/auth-storage';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

export class UrlRepository implements IUrlRepository {
  constructor(private readonly model: typeof UrlModel) {}
  async generateCode(): Promise<string> {
    while (true) {
      const code = UrlEntity.generateShortCode();

      const codeAlreadyExists = await this.model.findOne({
        where: {
          short_code: code,
        },
      });

      if (!codeAlreadyExists) {
        return code;
      }
    }
  }

  async getAll(props: UrlInputParams): Promise<UrlOutputParams> {
    const user = AuthStorage.get()?.user;

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const where: Record<string, any> = {
      user_id: user.id,
    };

    if (props.filter) {
      where[Op.or as any] = [
        { original_url: { [Op.like]: `%${props.filter}%` } },
        { short_code: { [Op.like]: `%${props.filter}%` } },
      ];
    }

    const count = await this.model.count({
      where,
    });

    const totalPages = Math.ceil(props.perPage / count);

    const urls = await this.model.findAll({
      where,
      limit: props.perPage,
      offset: (props.page - 1) * props.perPage,
      order:
        props.sort && props.sortDir
          ? [[props.sort, props.sortDir]]
          : [['created_at', 'desc']],
    });

    const output = new UrlOutputParams({
      data: urls.map(UrlModelMapper.toEntity),
      perPage: props.perPage,
      page: props.page,
      totalItems: count,
      totalPages,
    });

    return output;
  }

  async getById(
    id: string,
    transaction?: Transaction,
  ): Promise<UrlEntity | null> {
    const model = await this.model.findOne({
      where: {
        id,
      },
      transaction,
    });

    return model ? UrlModelMapper.toEntity(model) : null;
  }

  async getByShortCode(
    code: string,
    transaction?: Transaction,
  ): Promise<UrlEntity | null> {
    const model = await this.model.findOne({
      where: {
        short_code: code,
      },
      transaction,
    });

    return model ? UrlModelMapper.toEntity(model) : null;
  }

  async create(
    props: UrlEntity,
    transaction?: Transaction,
  ): Promise<UrlEntity | null> {
    const { dataValues } = UrlModelMapper.toModel(props);

    const result = await this.model.create(dataValues, {
      transaction,
    });

    return UrlModelMapper.toEntity(result);
  }

  async update(props: UrlEntity, transaction?: Transaction) {
    const { dataValues } = UrlModelMapper.toModel(props);

    const [affectedCount] = await this.model.update(dataValues, {
      where: {
        id: props.id,
      },
      transaction,
    });

    if (affectedCount === 0) {
      throw new NotFoundException(
        `Url with this id ${props.id} does not exist`,
      );
    }

    return props;
  }

  async delete(id: string, transaction?: Transaction): Promise<void> {
    await this.model.destroy({
      where: {
        id,
      },
      transaction,
    });
  }
}
