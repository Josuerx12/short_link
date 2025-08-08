export type PaginationOutputProps<DataT> = {
  data: DataT[];
  perPage: number;
  page: number;
  totalPages: number;
  totalItems: number;
};

export class PaginationOutput<DataT> {
  data: DataT[];
  meta: {
    totalPages: number;
    totalItems: number;
    perPage: number;
    page: number;
  };

  constructor(props: PaginationOutputProps<DataT>) {
    this.data = props.data;
    this.meta = {
      totalPages: props.totalPages,
      totalItems: props.totalItems,
      perPage: props.perPage,
      page: props.page,
    };
  }
}
