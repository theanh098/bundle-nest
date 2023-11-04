export type PaginateResponse<TData> = Readonly<{
  page: number;
  limit: number;
  nodes: Array<TData>;
  total: number;
}>;
