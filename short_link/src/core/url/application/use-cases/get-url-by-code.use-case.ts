import { IUseCase } from 'src/core/shared/domain/contracts/use-case.interface';
import { IUrlRepository } from '../../domain/contracts/url-repository.interface';
import { UrlEntity } from '../../domain/entities/url.entity';
import { GetUrlByCodeDto } from 'src/modules/urls/dto/get-url-by-code.dto';
import { Queue } from 'bullmq';
import { NotFoundException } from '@nestjs/common';

export class GetUrlByCodeUseCase
  implements IUseCase<GetUrlByCodeDto, UrlEntity>
{
  constructor(
    private readonly repository: IUrlRepository,
    private readonly queue: Queue,
  ) {}

  async execute(input: GetUrlByCodeDto) {
    const url = await this.repository.getByShortCode(input.code);

    if (!url) {
      throw new NotFoundException(`Url code: ${input.code} not found`);
    }

    await this.queue.add(
      'urlVisits',
      {
        urlId: url.id,
        accessedAt: new Date().toISOString(),
        ip: input.accessIp,
        userAgent: input.userAgent,
      },
      {
        removeOnComplete: true,
        attempts: 5,
        backoff: {
          type: 'exponential',
          delay: 60 * 1000 * 2,
        },
      },
    );

    return url;
  }
}
