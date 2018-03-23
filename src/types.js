// @flow

import { ActionTypes } from './actions';

export type Value = string | number;

export type Filters = {
  [name: string]: {
    filter: (a: Value, b: Value) => boolean,
  },
};

export type Row = { [key: string]: string } | string[];

export type Data = Object;

export type Column = {
  title: string,
  prop: string | number,
  render: (string, Data) => React$Element<any>,
  sortable: boolean,
  defaultContent: ?string,
  width: string | number,
  className: string | ((string, Data) => string),
};

export type AppData = Row[];

export type State = {
  initialized: boolean,
  initialData: AppData,
  data: AppData,
  page: AppData,
  sortBy: ?SortBy,
  pageSize: number,
  pageNumber: number,
  totalPages: number,
  filterValues: {
    [key: string]: string,
  },
};

export type Action = {
  type: string,
  payload: any,
  meta: { table: string },
  error?: any,
};

export type SortBy = {
  prop: Value,
  order: 'ascending' | 'descending',
};
