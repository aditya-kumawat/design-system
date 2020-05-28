import * as React from 'react';
// import schema from '../../simpleSchema';
import { Card, Table } from '@/index';
import { fetchData } from '../../fetchData';
import { errorTemplate } from '../../errorTemplate';
import loaderSchema from '../../simpleLoaderSchema';


// CSF format story
export const withAsyncData = () => {
  return (
    <Card
      shadow="light"
      style={{
        height: '350px',
      }}
    >
      <Table
        loaderSchema={loaderSchema}
        fetchData={fetchData}
        errorTemplate={() => errorTemplate}
      />
    </Card>
  );
};

export default {
  title: 'Organisms|Table/Variants',
  component: Table
};
