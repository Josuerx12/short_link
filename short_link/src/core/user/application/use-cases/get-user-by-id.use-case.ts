import { IUseCase } from 'src/core/shared/domain/contracts/use-case.interface';
import { GetUserByIdDto } from 'src/modules/users/dto/get-user-by-id.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/contracts/user-repository.interface';

export class GetUserByIdUseCase
  implements IUseCase<GetUserByIdDto, UserEntity>
{
  constructor(private readonly repository: IUserRepository) {}

  async execute(input: GetUserByIdDto) {
    const user = await this.repository.getById(input.id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
