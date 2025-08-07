export class ShowUrlVisitDto {
  id: string;
  accessedAt: Date;
  ipAddress?: string | null;
  userAgent?: string | null;
  url?: any;
  createdAt: Date;
  updatedAt: Date;
}
