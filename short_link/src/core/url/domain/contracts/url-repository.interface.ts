import { InputParams } from 'src/core/shared/domain/abstracts/input-params';
import { UrlEntity } from '../entities/url.entity';
import { OutputParams } from 'src/core/shared/domain/abstracts/output-params';
import { IBaseRepository } from 'src/core/shared/domain/contracts/base-repository.interface';
import { Transaction } from 'sequelize';

export type UrlFilter = string;

export class UrlInputParams extends InputParams<UrlFilter> {}

export class UrlOutputParams extends OutputParams<UrlEntity> {}

export interface IUrlRepository
  extends IBaseRepository<UrlEntity, string, UrlInputParams, UrlOutputParams> {
  generateCode(): Promise<string>;
  getByShortCode(
    code: string,
    transaction?: Transaction,
  ): Promise<UrlEntity | null>;
}
