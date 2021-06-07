import * as React from 'react';
// @ts-ignore
import VirtualScroll from 'react-dynamic-virtual-scroll';
import { GridRow } from './GridRow';
import { onSelectFn, PageInfo, Schema, updatePageInfoFunction } from './Grid';
// import { Grid } from '@/index';
import { GridProps } from '@/index.type';
import GridContext from './GridContext';

export interface GridBodyProps {
  schema: Schema;
  // data: Data;
  withCheckbox?: boolean;
  onSelect: onSelectFn;
  prevPageInfo: PageInfo;
  currPageInfo: PageInfo;
  updatePageInfo: updatePageInfoFunction;
}

export const GridBody = (props: GridBodyProps) => {
  const context = React.useContext(GridContext);

  const {
    data,
    withCheckbox,
    ref,
    size,
    loading,
    error,
    withPagination,
    page,
    pageSize,
    totalRecords,
    errorTemplate
  } = context;


  if (!loading && error) {
    return errorTemplate
      ? typeof errorTemplate === 'function' ? errorTemplate({}) : errorTemplate
      : null;
  }

  const {
    schema,
    prevPageInfo,
    currPageInfo,
    updatePageInfo,
    onSelect
  } = props;
  

  React.useEffect(() => {
    const gridBodyEl = ref!.querySelector('.Grid-body');
    if (gridBodyEl) {
      window.requestAnimationFrame(() => {
        if (prevPageInfo.page === page) {
          gridBodyEl.scrollTop = prevPageInfo.scrollTop;
        }
        updatePageInfo('prev', currPageInfo);
      });
    }

    return () => {
      updatePageInfo('curr', { page, scrollTop: gridBodyEl!.scrollTop });
    };
  }, []);

  const minRowHeight: Record<GridProps['size'], number> = {
    comfortable: 40,
    standard: 40,
    compressed: 32,
    tight: 24
  };

  const totalPages = Math.ceil(totalRecords / pageSize);

  const isLastPage = withPagination && page === totalPages;
  const dataLength = isLastPage
    ? totalRecords - (page - 1) * pageSize
    : loading
      ? pageSize
      : withPagination
        ? Math.min(totalRecords, pageSize)
        : totalRecords;

  const renderItem = (rowIndex: number) => {
    return (
      <GridRow
        // _this={_this}
        rowIndex={rowIndex}
        data={data[rowIndex]}
        schema={schema}
        withCheckbox={withCheckbox}
        onSelect={onSelect}
      />
    );
  };

  return (
    <VirtualScroll
      className="Grid-body"
      minItemHeight={minRowHeight[size]}
      totalLength={dataLength}
      length={20}
      buffer={7}
      renderItem={renderItem}
    />
  );
};

export default GridBody;
