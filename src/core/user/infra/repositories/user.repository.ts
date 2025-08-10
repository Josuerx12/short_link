import { Op, Transaction } from 'sequelize';
import {
  IUserRepository,
  UserInputParams,
  UserOutputParams,
} from '../../domain/contracts/user-repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserModel } from '../models/user.model';
import { UserModelMapper } from '../models/user.model.mapper';
import { NotFoundException } from '@nestjs/common';

export class UserRepository implements IUserRepository {
  constructor(private readonly model: typeof UserModel) {}

  async getAll(props: UserInputParams): Promise<UserOutputParams> {
    let where = {};

    if (props.filter) {
      where = {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${props.filter}%`,
            },
            email: {
              [Op.iLike]: `%${props.filter}%`,
            },
          },
        ],
      };
    }

    const count = await this.model.count(where);

    const totalPages = Math.ceil(count / props.perPage);

    const users = await this.model.findAll({
      where,
      offset: (props.page - 1) * props.perPage,
      limit: props.perPage,
      order:
        props.sort && props.sortDir
          ? [[props.sort, props.sortDir]]
          : [['created_at', 'desc']],
    });

    const output = new UserOutputParams({
      data: users.map(UserModelMapper.toEntity),
      perPage: props.perPage,
      page: props.page,
      totalPages,
      totalItems: count,
    });

    return output;
  }

  async getById(
    id: string,
    transaction?: Transaction,
  ): Promise<UserEntity | null> {
    const model = await this.model.findOne({
      where: {
        id,
      },
      transaction,
    });

    return model ? UserModelMapper.toEntity(model) : null;
  }

  async getByEmail(
    email: string,
    transaction?: Transaction,
  ): Promise<UserEntity | null> {
    const model = await this.model.findOne({
      where: {
        email,
      },
      transaction,
    });

    return model ? UserModelMapper.toEntity(model) : null;
  }

  async create(
    props: UserEntity,
    transaction?: Transaction,
  ): Promise<UserEntity | null> {
    const { dataValues } = UserModelMapper.toModel(props);

    const result = await this.model.create(dataValues, { transaction });

    return result ? UserModelMapper.toEntity(result) : null;
  }

  async update(
    props: UserEntity,
    transaction?: Transaction,
  ): Promise<UserEntity | null> {
    const { dataValues } = UserModelMapper.toModel(props);

    const [affectedCount] = await this.model.update(dataValues, {
      where: {
        id: props.id,
      },
      transaction,
    });

    if (affectedCount === 0) {
      throw new NotFoundException(
        `User with this id ${props.id} does not exist.`,
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
