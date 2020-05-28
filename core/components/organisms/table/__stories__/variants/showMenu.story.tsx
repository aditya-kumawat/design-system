import * as React from 'react';
import data from '../data';
import schema from '../simpleSchema';
import { Card, Heading, Table } from '@/index';
import { TableProps } from '@/index.type';

// CSF format story
export const showMenu = () => {
  const values: TableProps['showMenu'][] = [true, false];

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
          <Heading>{`showMenu: ${v}`}</Heading>
          <Card
            shadow="light"
            style={{
              height: '350px',
            }}
          >
            <Table
              showMenu={v}
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
