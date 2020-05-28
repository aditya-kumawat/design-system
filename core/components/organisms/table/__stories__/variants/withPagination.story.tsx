import * as React from 'react';
import data from '../data';
import schema from '../simpleSchema';
import { Card, Heading, Table } from '@/index';
import { TableProps } from '@/index.type';
import { action } from '@storybook/addon-actions';

// CSF format story
export const withPagination = () => {
  const values: TableProps["paginationType"][] = ['basic', 'jump'];

  const style = {
    display: 'flex',
    flexWrap: 'wrap',
  };

  return (
    // @ts-ignore
    <div style={style}>
      {values.map((v, _index) => (
        <div style={{
          margin: '20px',
          width: '45%'
        }}>
          <Heading>{`paginationType: ${v}`}</Heading>
          <Card
            shadow="light"
            style={{
              height: '350px',
            }}
          >
            <Table
              withPagination={true}
              paginationType={v}
              onPageChange={(page: number) => action(`on page change:- ${page}`)()}
              data={data}
              schema={schema}
            />
          </Card>
        </div>
      ))}
    </div>
  );
};

export default {
  title: 'Organisms|Table/Variants',
  component: Table
};
