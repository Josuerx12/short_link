import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserByIdDto } from './dto/update-user.dto';
import { GetUserByIdUseCase } from 'src/core/user/application/use-cases/get-user-by-id.use-case';
import { UpdateUserUseCase } from 'src/core/user/application/use-cases/update-user.use-case';
import { CreateUserUseCase } from 'src/core/user/application/use-cases/create-user.use-case';
import { UserPresenter } from './user.presenter';
import { GetUserByIdDto } from './dto/get-user-by-id.dto';

@Injectable()
export class UsersService {
  @Inject(GetUserByIdUseCase)
  private readonly getById: GetUserByIdUseCase;

  @Inject(UpdateUserUseCase)
  private readonly updateUser: UpdateUserUseCase;

  @Inject(CreateUserUseCase)
  private readonly createUser: CreateUserUseCase;

  async create(createUserDto: CreateUserDto) {
    const result = await this.createUser.execute(createUserDto);
    return result ? new UserPresenter(result) : null;
  }

  async findOne(param: GetUserByIdDto) {
    const result = await this.getById.execute(param);
    return result ? new UserPresenter(result) : null;
  }

  async update(param: UpdateUserByIdDto, updateUserDto: UpdateUserDto) {
    const result = await this.updateUser.execute({
      ...param,
      ...updateUserDto,
    });
    return result ? new UserPresenter(result) : null;
  }
}
