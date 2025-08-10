import { IUseCase } from 'src/core/shared/domain/contracts/use-case.interface';
import { IUrlRepository } from '../../domain/contracts/url-repository.interface';
import { UrlEntity } from '../../domain/entities/url.entity';
import { DeleteUrlByIdDto } from 'src/modules/urls/dto/delete-url-by-id.dto';

export class DeleteUrlByIdUseCase
  implements IUseCase<DeleteUrlByIdDto, UrlEntity>
{
  constructor(private readonly repository: IUrlRepository) {}

  async execute(input: DeleteUrlByIdDto) {
    const url = await this.repository.getById(input.id);

    if (!url) {
      throw new Error('Url not found');
    }

    await this.repository.delete(input.id);

    url.deletedAt = new Date();

    return url;
  }
}
