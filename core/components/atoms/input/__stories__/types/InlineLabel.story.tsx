import * as React from 'react';
import Input from '../../Input';
import Text from '@/components/atoms/text';
import { action } from '@storybook/addon-actions';

// CSF format story
export const inlineLabel = () => {

  const label = 'USD';
  return (
    <div>
      <div style={{ width: '20px' }}>
        <Input
          name="input"
          type="number"
          size="regular"
          inlineLabel={label}
          onChange={action('on-change')}
        />
        <br />
        <Text weight="strong">Regular</Text>
      </div>
      <br />
      <div style={{ width: '20px' }}>
        <Input
          name="input"
          type="number"
          size="large"
          inlineLabel={label}
          onChange={action('on-change')}
        />
        <br />
        <Text weight="strong">Large</Text>
      </div>
    </div>
  );
};

// Required for CSF format story
// https://medium.com/storybookjs/component-story-format-66f4c32366df
export default { title: 'Input' };
