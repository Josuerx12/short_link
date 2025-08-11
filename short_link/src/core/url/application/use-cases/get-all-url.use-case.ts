import { PaginationOutput } from 'src/core/shared/application/pagination.output';
import { IUseCase } from 'src/core/shared/domain/contracts/use-case.interface';
import { GetAllUrlDto } from 'src/modules/urls/dto/get-all-url.dto';
import { UrlOutput, UrlOutputMapper } from '../shared/url.output';
import {
  IUrlRepository,
  UrlInputParams,
} from '../../domain/contracts/url-repository.interface';

export class GetAllUrlUseCase
  implements IUseCase<GetAllUrlDto, PaginationOutput<UrlOutput>>
{
  constructor(private readonly repository: IUrlRepository) {}

  async execute(input: GetAllUrlDto) {
    const urlInputParams = new UrlInputParams(input);

    const results = await this.repository.getAll(urlInputParams);

    return new PaginationOutput({
      ...results.meta,
      items: results.data.map(UrlOutputMapper.toOutput),
    });
  }
}
