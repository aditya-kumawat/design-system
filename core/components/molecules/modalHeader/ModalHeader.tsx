import * as React from 'react';
import classNames from 'classnames';
import { BaseProps, extractBaseProps } from '@/utils/types';
import { Heading, Text, Icon } from '@/index';

export interface ModalHeaderProps extends BaseProps {
  heading?: string;
  onClose: (event?: React.MouseEvent<HTMLElement, MouseEvent>, reason?: string) => void;
  subHeading?: string;
  separator?: boolean;
}

export const ModalHeader = (props: ModalHeaderProps) => {
  const { className, heading, subHeading, separator, onClose } = props;
  const baseProps = extractBaseProps(props);

  const classes = classNames({
    ['ModalHeader']: true,
    ['ModalHeader--withSeparator']: separator
  }, className);

  const subheaderClasses = classNames({
    'ModalHeader-subheading': true
  });

  return (
    <div {...baseProps} className={classes}>
      <div data-test="DesignSystem-ModalHeader" className="ModalHeader-headingWrapper">
        <div className="ModalHeader-heading">
          {heading && (
            <Heading>{heading}</Heading>
          )}
        </div>
        <Icon
          name={'close'}
          size={20}
          className="cursor-pointer"
          data-test="DesignSystem-ModalHeader--CloseIcon"
          onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => onClose(event, 'IconClick')}
        />
      </div>
      {subHeading && (
        <Text
          appearance="subtle"
          className={subheaderClasses}
          data-test="DesignSystem-ModalHeader--Subheading"
        >
          {subHeading}
        </Text>
      )}
    </div>
  );
};

ModalHeader.displayName = 'ModalHeader';
ModalHeader.defaultProps = {
  iconAppearance: Icon.defaultProps.appearance
};

export default ModalHeader;
