import { IUseCase } from 'src/core/shared/domain/contracts/use-case.interface';
import { GetUrlByIdDto } from 'src/modules/urls/dto/get-url-by-id.dto';
import { IUrlRepository } from '../../domain/contracts/url-repository.interface';
import { UrlEntity } from '../../domain/entities/url.entity';
import { IUrlVisitGateway } from 'src/core/url-visits/domain/constracts/url-visit-gateway.interface';
import { AuthStorage } from 'src/core/shared/application/auth-storage';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

export class GetUrlByIdUseCase implements IUseCase<GetUrlByIdDto, UrlEntity> {
  constructor(
    private readonly repository: IUrlRepository,
    private readonly urlVisitGateway: IUrlVisitGateway,
  ) {}

  async execute(input: GetUrlByIdDto) {
    const authStorage = AuthStorage.get();

    const user = authStorage?.user;

    const url = await this.repository.getById(input.id);

    if (!url) {
      throw new NotFoundException(`Url id: ${input.id} not found`);
    }

    if (url.userId && user && url.userId !== user.id) {
      throw new UnauthorizedException(
        'You does not have access to this url details.',
      );
    }

    const urlVisits = await this.urlVisitGateway.getAllUrlVisits(url.id);

    url.urlVisits = urlVisits.map((u) => ({
      id: u.id,
      urlId: u.urlId,
      accessedAt: u.accessedAt,
      userAgent: u.userAgent,
    }));

    return url;
  }
}
