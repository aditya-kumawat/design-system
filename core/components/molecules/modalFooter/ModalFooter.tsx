import * as React from 'react';
import classNames from 'classnames';
import { BaseProps, extractBaseProps } from '@/utils/types';

export interface ModalFooterProps extends BaseProps {
  separator?: boolean;
  children: React.ReactNode;
}

export const ModalFooter = (props: ModalFooterProps) => {
  const { children, className, separator } = props;
  const baseProps = extractBaseProps(props);

  const classes = classNames({
    'Modal-footer': true,
    'Modal-footer--withSeparator': separator
  }, className);

  return (
    <div data-test="DesignSystem-ModalFooter" {...baseProps} className={classes}>
      {children}
    </div>
  );
};

ModalFooter.displayName = 'ModalFooter';

export default ModalFooter;
