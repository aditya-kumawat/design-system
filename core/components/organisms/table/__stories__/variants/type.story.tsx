import * as React from 'react';
import data from '../data';
import schema from '../simpleSchema';
import { Card, Heading, Table } from '@/index';
import { TableProps } from '@/index.type';

// CSF format story
export const type = () => {
  const values: TableProps["type"][] = ['resource', 'data'];

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
          <Heading>{v}</Heading>
          <Card
            shadow="light"
            style={{
              height: '350px',
            }}
          >
            <Table
              type={v}
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
