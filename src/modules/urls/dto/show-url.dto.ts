export class ShowUrlDto {
  id: string;
  shortCode: string;
  originalUrl: string;
  visitCount: number;
  user?: any;
  visits: any[];
  createdAt: Date;
  updatedAt?: Date;
}
