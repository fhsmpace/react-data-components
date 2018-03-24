// @flow

import orderBy from 'lodash/orderBy';
import some from 'lodash/some';
import type { SortBy, Row, Value, Filters } from './types';

export function sort({ prop, order }: SortBy, data: Row[]) {
  return orderBy(data, prop, order == 'descending' ? 'desc' : 'asc');
}

export function filter(filters: Filters, filterValues: Object, data: Row[]) {
  return data.filter(row => {
    for (let key of Object.keys(filterValues)) {
      const value = filterValues[key];
      const prop = filters[key].prop;
      const filter = filters[key].filter;

      if (
        (!prop && some(row, filter.bind(null, value))) ||
        // $FlowFixMe
        filter(value, row[key])
      ) {
        return true;
      }
    }

    return false;
  });
}

export function containsIgnoreCase(a: Value, b: Value) {
  const trimmedA = String(a)
    .toLowerCase()
    .trim();
  const trimmedB = String(b)
    .toLowerCase()
    .trim();

  return trimmedB.indexOf(trimmedA) >= 0;
}
