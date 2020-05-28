import { TableProps, CellSchema } from '../Table';
import data from './data';
const schema:CellSchema[] = require('./simpleSchema').default;

export const fetchData: TableProps['fetchData'] = attr => {
  const {
    page,
    pageSize,
    sortingList,
    filters = {}
  } = attr;

  let filteredData = data;
  Object.keys(filters).forEach(schemaName => {
    const filterList = filters[schemaName];
    const sIndex = schema.findIndex(s => s.name === schemaName);
    const { onFilterChange } = schema[sIndex];
    if (filterList.length && onFilterChange) {
      filteredData = filteredData.filter(d => onFilterChange(d, filterList));
    }
  });

  const sortedData = filteredData;
  sortingList?.forEach(l => {
    const sIndex = schema.findIndex(s => s.name === l.name);
    const { comparator } = schema[sIndex];
    sortedData.sort(comparator);
    if (l.type === 'desc') sortedData.reverse();
  });

  if (page === 2) return Promise.reject();

  if (page && pageSize) {
    return new Promise(resolve => {
      setTimeout(() => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const slicedData = sortedData.slice(start, end);
        resolve({
          schema,
          totalRecords: sortedData.length,
          data: slicedData,
        });
      }, 2000);
    });
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        schema,
        totalRecords: sortedData.length,
        data: sortedData,
      });
    }, 2000);
  });
  // return Promise.resolve({
  //   totalRecords: 0,
  //   data: [],
  //   schema: []
  // })
};