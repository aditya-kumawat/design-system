import * as React from 'react';
import { BaseProps } from '@/utils/types';
export declare type Shadow = 'none' | 'light' | 'medium' | 'dark';
export interface CardProps extends BaseProps {
    shadow?: Shadow;
    children: React.ReactNode;
}
export declare const Card: {
    (props: CardProps): JSX.Element;
    defaultProps: {
        shadow: string;
    };
    displayName: string;
};
export default Card;
