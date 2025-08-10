import { IUseCase } from 'src/core/shared/domain/contracts/use-case.interface';
import { ApplicationService } from 'src/core/shared/application/application.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import {
  UpdateUrlDto,
  UpdateUrlByIdDto,
} from 'src/modules/urls/dto/update-url.dto';
import { IUrlRepository } from '../../domain/contracts/url-repository.interface';
import { UrlEntity } from '../../domain/entities/url.entity';
import { AuthStorage } from 'src/core/shared/application/auth-storage';

export class UpdateUrlUseCase
  implements IUseCase<UpdateUrlDto & UpdateUrlByIdDto, UrlEntity>
{
  constructor(
    private readonly appService: ApplicationService,
    private readonly repository: IUrlRepository,
  ) {}

  async execute(input: UpdateUrlDto & UpdateUrlByIdDto) {
    return await this.appService.run(async (t) => {
      const { id, originalUrl } = input;

      const { user } = AuthStorage.get();

      const url = await this.repository.getById(id, t);

      if (!url) {
        throw new NotFoundException(`Url not found with id ${id}`);
      }

      if (user && url.userId !== user.id) {
        throw new UnauthorizedException(
          'You does not have access to this url.',
        );
      }

      if (originalUrl) {
        url.originalUrl = originalUrl;
      }

      await this.repository.update(url, t);

      return url;
    });
  }
}
