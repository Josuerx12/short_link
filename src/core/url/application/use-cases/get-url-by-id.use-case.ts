import { IUseCase } from 'src/core/shared/domain/contracts/use-case.interface';
import { GetUrlByIdDto } from 'src/modules/urls/dto/get-url-by-id.dto';
import { IUrlRepository } from '../../domain/contracts/url-repository.interface';
import { UrlEntity } from '../../domain/entities/url.entity';

export class GetUrlByIdUseCase implements IUseCase<GetUrlByIdDto, UrlEntity> {
  constructor(private readonly repository: IUrlRepository) {}

  async execute(input: GetUrlByIdDto) {
    const url = await this.repository.getById(input.id);

    if (!url) {
      throw new Error('Url not found');
    }

    return url;
  }
}
