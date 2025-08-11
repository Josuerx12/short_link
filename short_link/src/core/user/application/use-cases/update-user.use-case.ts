import { IUseCase } from 'src/core/shared/domain/contracts/use-case.interface';
import {
  UpdateUserByIdDto,
  UpdateUserDto,
} from 'src/modules/users/dto/update-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { ApplicationService } from 'src/core/shared/application/application.service';
import { IUserRepository } from '../../domain/contracts/user-repository.interface';
import { ConflictException, NotFoundException } from '@nestjs/common';

export class UpdateUserUseCase
  implements IUseCase<UpdateUserDto & UpdateUserByIdDto, UserEntity>
{
  constructor(
    private readonly appService: ApplicationService,
    private readonly repository: IUserRepository,
  ) {}

  async execute(input: UpdateUserDto & UpdateUserByIdDto) {
    return await this.appService.run(async (t) => {
      const { id, email, name } = input;

      const user = await this.repository.getById(id, t);

      if (!user) {
        throw new NotFoundException(`User not found with id ${id}`);
      }

      if (email) {
        await this.verifyEmailInUse(email, user);
      }

      if (name) {
        user.name = name;
      }

      await this.repository.update(user, t);

      return user;
    });
  }

  private async verifyEmailInUse(email: string, entity: UserEntity) {
    if (entity.email.includes(email)) {
      return;
    }

    const user = await this.repository.getByEmail(email);

    if (user) {
      throw new ConflictException(`E-mail ${email} already in use.`);
    }

    entity.email = email;
  }
}
