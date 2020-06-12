import * as React from 'react';
import { Header, ExternalHeaderProps } from '../grid/Header';
import { Grid } from '@/index';
import { Data, Schema, onSelectFn, onSelectAllFn, GridProps, FetchDataOptions, fetchDataFn, RowData } from '../grid';
import { updateBatchData, filterData, sortData, paginateData } from '../grid/utility';

interface SyncProps {
  data: Data;
  schema: Schema;
}

interface AsyncProps {
  fetchData: fetchDataFn;
}

interface SharedListProps {
  type?: GridProps['type'];
  size?: GridProps['size'];
  withHeader?: boolean;
  headerProps?: ExternalHeaderProps;
  withCheckbox?: GridProps['withCheckbox'];
  withPagination?: GridProps['withPagination'];
  paginationType?: GridProps['paginationType'];
  pageSize?: GridProps['pageSize'];
  loaderSchema?: GridProps['loaderSchema'];
  onRowClick?: GridProps['onRowClick'];
  onSelect?: (rowIndex: number[], selected: boolean, allSelected: RowData[]) => void;
}

type SyncListProps = SyncProps & SharedListProps;
type AsyncListProps = AsyncProps & SharedListProps;

export type ListProps = (AsyncListProps | SyncListProps);

export const List = (props: ListProps) => {
  const {
    type,
    size,
    withHeader,
    headerProps,
    withCheckbox,
    withPagination,
    paginationType,
    pageSize,
    loaderSchema,
    onRowClick,
    onSelect: onSelectProp,
    // @ts-ignore
    data: dataProp,
    // @ts-ignore
    schema: schemaProp,
    // @ts-ignore
    fetchData
  } = props;

  const async = ('fetchData' in props);

  const [state, setState] = React.useState({
    data: dataProp || [],
    schema: schemaProp || [],
    totalRecords: 0,
    loading: true,
  });

  const {
    data,
    schema
  } = state;

  React.useEffect(() => {
    if (!async && (dataProp !== data || schemaProp !== schema)) {
      setState({
        loading: false,
        schema: schemaProp,
        data: schemaProp,
        totalRecords: dataProp.length
      });
    }
  }, [dataProp, schemaProp]);

  const updateSyncData = (options: FetchDataOptions) => {
    setState({
      ...state,
      loading: true
    });

    const {
      page,
      pageSize: pageSizeOp,
      sortingList,
      filterList
    } = options;

    const filteredData = filterData(schema, dataProp, filterList);
    const sortedData = sortData(schema, filteredData, sortingList);
    let renderedData = sortedData;
    const totalRecords = sortedData.length;
    if (withPagination && page && pageSizeOp) {
      renderedData = paginateData(renderedData, page, pageSizeOp);
    }

    setState({
      ...state,
      schema,
      totalRecords,
      loading: false,
      data: renderedData,
    });
  };

  const updateAsyncData = (options: FetchDataOptions) => {
    setState({
      ...state,
      loading: true
    });

    fetchData(options)
      .then((res: any) => {
        setState({
          ...state,
          schema: res.schema,
          data: res.data,
          totalRecords: res.totalRecords,
          loading: false,
        });
      })
      .catch(() => {
        setState({
          ...state,
          loading: false,
          data: []
        });
      });
  };

  const onSelect: onSelectFn = (rowIndex, selected) => {
    const indexes = [rowIndex];
    const newData = updateBatchData(state.data, indexes, {
      _selected: selected
    });

    if (onSelectProp) {
      onSelectProp(indexes, selected, newData.filter(d => d._selected));
    }

    setState({
      ...state,
      data: newData
    });
  };

  const onSelectAll: onSelectAllFn = selected => {
    const indexes = Array.from({ length: state.data.length }, (_, i) => i);
    const newData = updateBatchData(state.data, indexes, {
      _selected: selected
    });

    if (onSelectProp) {
      onSelectProp(indexes, selected, newData.filter(d => d._selected));
    }

    setState({
      ...state,
      data: newData
    });
  };

  const {
    // @ts-ignore
    children: headerChildren,
    ...headerAttr
  } = headerProps;

  return (
    <div className="List">
      {withHeader && (
        <div className="List-header">
          <Header
            {...state}
            updateData={async ? updateAsyncData : updateSyncData}
            showHead={false}
            withCheckbox={withCheckbox}
            onSelectAll={onSelectAll}
            {...headerAttr}
          >
            {headerChildren}
          </Header>
        </div>
      )}
      <div className="List-grid">
        <Grid
          {...state}
          showHead={false}
          updateData={async ? updateAsyncData : updateSyncData}
          withCheckbox={withCheckbox}
          onSelect={onSelect}
          onSelectAll={onSelectAll}
          type={type}
          size={size}
          withPagination={withPagination}
          paginationType={paginationType}
          pageSize={pageSize}
          loaderSchema={loaderSchema}
          onRowClick={onRowClick}
        />
      </div>
    </div>
  );
};

export default List;
