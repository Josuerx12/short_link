import { HttpService } from '@nestjs/axios';
import { IShortUrlGateway, Url } from './shot-url.interface';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ShortUrlGateway implements IShortUrlGateway {
  private url: string;
  private apiKey: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.url = this.configService.get<string>('SHORT_LINK_URI')!;
    this.apiKey = this.configService.get<string>('SHORT_LINK_API_KEY')!;
  }

  async findUrl(urlId: string): Promise<Url> {
    console.log(this.url, this.apiKey);

    const res = await firstValueFrom(
      this.httpService.get<Url>(`${this.url}/urls/${urlId}`, {
        headers: {
          'x-api-key': this.apiKey,
        },
      }),
    );

    return res.data;
  }
}
