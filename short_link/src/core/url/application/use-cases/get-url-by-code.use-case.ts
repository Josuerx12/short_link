import { IUseCase } from 'src/core/shared/domain/contracts/use-case.interface';
import { IUrlRepository } from '../../domain/contracts/url-repository.interface';
import { UrlEntity } from '../../domain/entities/url.entity';
import { GetUrlByCodeDto } from 'src/modules/urls/dto/get-url-by-code.dto';

export class GetUrlByIdUseCase implements IUseCase<GetUrlByCodeDto, UrlEntity> {
  constructor(private readonly repository: IUrlRepository) {}

  async execute(input: GetUrlByCodeDto) {
    const url = await this.repository.getByShortCode(input.code);

    if (!url) {
      throw new Error('Url not found');
    }

    return url;
  }
}
