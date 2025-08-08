export type OutputParamsProps<DataT> = {
  data: DataT[];
  perPage: number;
  page: number;
  totalPages: number;
  totalItems: number;
};

export abstract class OutputParams<DataT> {
  data: DataT[];
  meta: {
    totalPages: number;
    totalItems: number;
    perPage: number;
    page: number;
  };

  constructor(props: OutputParamsProps<DataT>) {
    this.data = props.data;
    this.meta = {
      totalPages: props.totalPages,
      totalItems: props.totalItems,
      perPage: props.perPage,
      page: props.page,
    };
  }
}
