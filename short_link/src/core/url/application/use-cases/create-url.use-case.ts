import { IUseCase } from 'src/core/shared/domain/contracts/use-case.interface';
import { ApplicationService } from 'src/core/shared/application/application.service';
import { CreateUrlDto } from 'src/modules/urls/dto/create-url.dto';
import { IUrlRepository } from '../../domain/contracts/url-repository.interface';
import { UrlEntity } from '../../domain/entities/url.entity';
import { AuthStorage } from 'src/core/shared/application/auth-storage';

export class CreateUrlUseCase implements IUseCase<CreateUrlDto, UrlEntity> {
  constructor(
    private readonly appService: ApplicationService,
    private readonly repository: IUrlRepository,
  ) {}

  async execute(input: CreateUrlDto) {
    return await this.appService.run(async (transaction) => {
      const authStorage = AuthStorage.get();

      const user = authStorage?.user;

      const { originalUrl } = input;

      const shortCode = await this.repository.generateCode();

      const url = new UrlEntity({
        originalUrl,
        shortCode,
        visitCount: 0,
        userId: user?.id,
      });

      await this.repository.create(url, transaction);

      return url;
    });
  }
}
