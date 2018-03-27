// @flow

import orderBy from 'lodash/orderBy';
import type { SortBy, Row, Value, Filters } from './types';

export function sort({ prop, order }: SortBy, data: Row[]) {
  return orderBy(data, prop, order == 'descending' ? 'desc' : 'asc');
}

function some(data: Row, f: Value => boolean) {
  if (Array.isArray(data)) {
    return data.some(f);
  } else {
    for (let key of Object.keys(data)) {
      if (f(data[key])) {
        return true;
      }
    }

    return false;
  }
}

export function filter(filters: Filters, filterValues: Object, data: Row[]) {
  return data.filter(row => {
    for (let key of Object.keys(filterValues)) {
      const value = filterValues[key];
      const prop = filters[key].prop;
      const filter = filters[key].filter;

      if (
        (!prop && some(row, filter.bind(null, value))) ||
        // $FlowFixMe: Property accessor should work with both number and string
        filter(value, row[prop])
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
