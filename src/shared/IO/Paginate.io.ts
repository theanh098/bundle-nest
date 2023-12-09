export type PaginateResponse<TData> = Readonly<{
  page: number;
  limit: number;
  nodes: Array<TData>;
  total: number;
}>;

export type CursorPaginateResponse<A, R> = Readonly<{
  nodes: Array<A>;
  cursor: R;
}>;
