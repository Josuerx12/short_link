import { IUseCase } from 'src/core/shared/domain/contracts/use-case.interface';
import { IUrlRepository } from '../../domain/contracts/url-repository.interface';
import { UrlEntity } from '../../domain/entities/url.entity';
import { DeleteUrlByIdDto } from 'src/modules/urls/dto/delete-url-by-id.dto';
import { NotFoundException } from '@nestjs/common';

export class DeleteUrlByIdUseCase
  implements IUseCase<DeleteUrlByIdDto, UrlEntity>
{
  constructor(private readonly repository: IUrlRepository) {}

  async execute(input: DeleteUrlByIdDto) {
    const url = await this.repository.getById(input.id);

    if (!url) {
      throw new NotFoundException(`Url id: ${input.id} not found`);
    }

    await this.repository.delete(input.id);

    url.deletedAt = new Date();

    return url;
  }
}
