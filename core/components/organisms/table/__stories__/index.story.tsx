import * as React from 'react';
import { Table, Data } from '../Table';
import data from './data';
import schema from './schema';
import loaderSchema from './loaderSchema';
import { number, boolean, select } from '@storybook/addon-knobs';
import { Card } from '@/index';
import { action } from '@storybook/addon-actions';
import { fetchData } from './fetchData';
import {errorTemplate} from './errorTemplate';

export const all = () => {
  const async = boolean(
    'async',
    true
  );

  const type = select(
    'type',
    ['resource', 'data'],
    'resource'
  );

  const size = select(
    'size',
    ['comfortable', 'standard', 'compressed', 'tight'],
    'comfortable'
  );

  const showHeader = boolean(
    'showHeader',
    true
  );

  const showMenu = boolean(
    'showMenu',
    false
  );

  const draggable = boolean(
    'draggable',
    false
  );

  const withPagination = boolean(
    'withPagination',
    true
  );

  const paginationType = select(
    'paginationType',
    ['basic', 'jump'],
    'jump'
  );

  const pageSize = number(
    'pageSize',
    12
  );

  const withCheckbox = boolean(
    'withCheckbox',
    true
  );

  return (
    <Card
      shadow="light"
      style={{
        height: '350px',
      }}
    >
      <Table
        type={type}
        size={size}
        data={!async ? data : undefined}
        schema={!async ? schema : undefined}
        loaderSchema={loaderSchema}
        fetchData={async ? fetchData : undefined}
        errorTemplate={() => errorTemplate}
        showHeader={showHeader}
        showMenu={showMenu}
        draggable={draggable}
        withPagination={withPagination}
        paginationType={paginationType}
        pageSize={withPagination ? pageSize : undefined}
        onPageChange={(page: number) => action(`on page change:- ${page}`)()}
        withCheckbox={withCheckbox}
        onSelect={(rowIndex, selected) => action(`on select:- rowIndex:${rowIndex}, selected:${selected}`)()}
        onSelectAll={(page, selected) => action(`on select all:- page:${page}, selected:${selected}`)()}
        statusMapper={{
          male: 'success',
          female: 'alert',
        }}
        onRowClick={(rowData: Data) => action(`on row click:- ${JSON.stringify(rowData)}`)()}
      />
    </Card>
  );
};

export default {
  title: 'Organisms|Table',
  component: Table
};
