export type PaginationOutputProps<DataT> = {
  items: DataT[];
  perPage: number;
  page: number;
  totalPages: number;
  totalItems: number;
};

export class PaginationOutput<DataT> {
  items: DataT[];
  meta: {
    totalPages: number;
    totalItems: number;
    perPage: number;
    page: number;
  };

  constructor(props: PaginationOutputProps<DataT>) {
    this.items = props.items;
    this.meta = {
      totalPages: props.totalPages,
      totalItems: props.totalItems,
      perPage: props.perPage,
      page: props.page,
    };
  }
}
