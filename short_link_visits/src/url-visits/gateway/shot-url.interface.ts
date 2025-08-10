export type Url = {
  id: string;
  userId: string;
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface IShortUrlGateway {
  findUrl(urlId: string): Promise<Url>;
}
