export type InputParamsProps<TFilter> = {
  sort?: string;
  sortDir?: 'asc' | 'desc';
  perPage?: string;
  page?: string;
  filter?: TFilter | string;
};

export abstract class InputParams<TFilter> {
  sort?: string;
  sortDir?: 'asc' | 'desc';
  perPage: number;
  page: number;
  filter?: TFilter | string;

  constructor(props: InputParamsProps<TFilter>) {
    Object.assign(this, props);

    this.perPage = props.perPage ? parseInt(props.perPage) : 10;
    this.page = props.page ? parseInt(props.page) : 1;
  }
}
