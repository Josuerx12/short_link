import { Inject, Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlByIdDto, UpdateUrlDto } from './dto/update-url.dto';
import { CreateUrlUseCase } from 'src/core/url/application/use-cases/create-url.use-case';
import { DeleteUrlByIdUseCase } from 'src/core/url/application/use-cases/delete-url-by-id.use-case';
import { GetUrlByCodeUseCase } from 'src/core/url/application/use-cases/get-url-by-code.use-case';
import { GetUrlByIdUseCase } from 'src/core/url/application/use-cases/get-url-by-id.use-case';
import { UpdateUrlUseCase } from 'src/core/url/application/use-cases/update-url.use-case';
import { GetAllUrlDto } from './dto/get-all-url.dto';
import { GetAllUrlUseCase } from 'src/core/url/application/use-cases/get-all-url.use-case';
import { GetUrlByIdDto } from './dto/get-url-by-id.dto';
import { DeleteUrlByIdDto } from './dto/delete-url-by-id.dto';
import { GetUrlByCodeDto } from './dto/get-url-by-code.dto';

@Injectable()
export class UrlsService {
  @Inject(GetUrlByIdUseCase)
  private readonly getById: GetUrlByIdUseCase;

  @Inject(GetAllUrlUseCase)
  private readonly getAll: GetAllUrlUseCase;

  @Inject(GetUrlByCodeUseCase)
  private readonly getByCode: GetUrlByCodeUseCase;

  @Inject(DeleteUrlByIdUseCase)
  private readonly deleteById: DeleteUrlByIdUseCase;

  @Inject(UpdateUrlUseCase)
  private readonly updateUrl: UpdateUrlUseCase;

  @Inject(CreateUrlUseCase)
  private readonly createUrl: CreateUrlUseCase;

  create(createUrlDto: CreateUrlDto) {
    return this.createUrl.execute(createUrlDto);
  }

  findAll(query: GetAllUrlDto) {
    return this.getAll.execute(query);
  }

  findOne(param: GetUrlByIdDto) {
    return this.getById.execute(param);
  }

  findOneByCode(param: GetUrlByCodeDto) {
    return this.getByCode.execute(param);
  }

  update(param: UpdateUrlByIdDto, updateUrlDto: UpdateUrlDto) {
    return this.updateUrl.execute({ ...updateUrlDto, ...param });
  }

  remove(param: DeleteUrlByIdDto) {
    return this.deleteById.execute(param);
  }
}
