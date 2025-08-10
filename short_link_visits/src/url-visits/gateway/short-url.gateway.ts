import { HttpService } from '@nestjs/axios';
import { IShortUrlGateway, Url } from './shot-url.interface';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ShortUrlGateway implements IShortUrlGateway {
  private url: string;
  private secret: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.url = this.configService.get<string>('SHORT_LINK_URI')!;
    this.secret = this.configService.get<string>('SHORT_LINK_SECRET')!;
  }

  async findUrl(urlId: string): Promise<Url> {
    const res = await firstValueFrom(
      this.httpService.get<Url>(`${this.url}/urls/${urlId}`, {
        headers: {
          'x-api-key': this.secret,
        },
      }),
    );

    return res.data;
  }
}
