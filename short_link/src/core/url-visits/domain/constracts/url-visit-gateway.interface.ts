export type UrlVisit = {
  id?: string;
  urlId: string;
  accessedAt: string;
  ip?: string;
  userAgent?: string;
};

export interface IUrlVisitGateway {
  addVisit(props: UrlVisit): Promise<void>;
  getAllUrlVisits(urlId: string): Promise<UrlVisit[]>;
}
