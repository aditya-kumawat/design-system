import * as React from 'react';
import Input from '../../../Input';
import { action } from '@storybook/addon-actions';
import Text from '@/components/atoms/text';

// CSF format story
export const iconLeft = () => {
  const icon = 'search';
  return (
    <div className="Row">
      <div  className="mr-9 mb-8 w-25">
        <Input
          name="input"
          value="Value"
          onChange={action('on-change')}
          onClear={action('on-clear')}
          icon={icon}
        />
        <br />
        <Text weight="strong">Default</Text>
      </div>
      <div  className="mr-9 mb-8 w-25">
        <Input
          name="input"
          value=""
          placeholder="Placeholder"
          onChange={action('on-change')}
          onClear={action('on-clear')}
          info="sample info popover"
          icon={icon}
        />
        <br />
        <Text weight="strong">Placeholder</Text>
      </div>
      <div  className="mr-9 mb-8 w-25">
        <Input
          name="input"
          value="Value"
          onChange={action('on-change')}
          onClear={action('on-clear')}
          error={true}
          icon={icon}
        />
        <br />
        <Text weight="strong">Error</Text>
      </div>
      <div  className="mr-9 mb-8 w-25">
        <Input
          name="input"
          value="Value"
          onChange={action('on-change')}
          disabled={true}
          icon={icon}
        />
        <br />
        <Text weight="strong">Disabled</Text>
      </div>
      <div  className="mr-9 mb-8 w-25">
        <Input
          name="input"
          value="Value"
          icon={icon}
        />
        <br />
        <Text weight="strong">Read Only</Text>
      </div>
    </div>
  );
};

export default {
  title: 'Atoms|Input/Variants/Types',
  component: Input,
  parameters: {
    docs: {
      docPage: {
        title: 'Input'
      }
    }
  }
};
