import { IUseCase } from 'src/core/shared/domain/contracts/use-case.interface';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/contracts/user-repository.interface';
import { ApplicationService } from 'src/core/shared/application/application.service';

export class CreateUserUseCase implements IUseCase<CreateUserDto, UserEntity> {
  constructor(
    private readonly appService: ApplicationService,
    private readonly repository: IUserRepository,
  ) {}

  async execute(input: CreateUserDto) {
    return await this.appService.run(async (transaction) => {
      const { email, name, password } = input;

      const hashedPassword = UserEntity.hashPassword(password);

      const user = new UserEntity({ email, name, password: hashedPassword });

      return await this.repository.create(user, transaction);
    });
  }
}
