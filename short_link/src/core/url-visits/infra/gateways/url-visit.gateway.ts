import { HttpService } from '@nestjs/axios';
import {
  UrlVisit,
  IUrlVisitGateway,
} from '../../domain/constracts/url-visit-gateway.interface';
import { firstValueFrom } from 'rxjs';
import { UrlRepository } from 'src/core/url/infra/repositories/url.repository';
import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';

export class UrlVisitGateway implements IUrlVisitGateway {
  private uri: string;
  private apiKey: string;
  constructor(
    private readonly configService: ConfigService,
    private httpService: HttpService,
    private readonly urlRepository: UrlRepository,
  ) {
    this.uri = this.configService.get<string>('URL_VISIT_URI')!;
    this.apiKey = this.configService.get<string>('URL_VISIT_API_KEY')!;
  }
  async getAllUrlVisits(urlId: string): Promise<UrlVisit[]> {
    const res = await firstValueFrom(
      this.httpService.get(`${this.uri}/url-visits/all-by-url/${urlId}`, {
        headers: {
          'x-api-key': this.apiKey,
        },
      }),
    );

    return res.data as UrlVisit[];
  }

  async addVisit(props: UrlVisit): Promise<void> {
    const url = await this.urlRepository.getById(props.urlId);

    if (!url) {
      throw new NotFoundException(`Url id: ${props.id} not found`);
    }

    url.visitCount = url.visitCount + 1;

    await this.urlRepository.update(url);

    await firstValueFrom(
      this.httpService.post(
        `${this.uri}/url-visits`,
        {
          urlId: props.urlId,
          accessedAt: props.accessedAt,
          ip: props.ip,
          userAgent: props.userAgent,
        },
        {
          headers: {
            'x-api-key': this.apiKey,
          },
        },
      ),
    );
  }
}
