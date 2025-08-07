export class ShortUrlDto {
  id: string;
  shortCode: string;
  originalUrl: string;
  visitCount: number;
  createdAt: Date;
}
