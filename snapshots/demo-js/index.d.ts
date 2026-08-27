/* eslint-disable */

import { ButtonHTMLAttributes, FunctionComponent, MouseEventHandler, SVGAttributes } from 'react';
export { default as IconAlipay } from './IconAlipay';
export { default as IconUser } from './IconUser';
export { default as IconSetup } from './IconSetup';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label' | 'children' | 'dangerouslySetInnerHTML' | 'onClick'>;

interface Props extends Omit<SVGAttributes<SVGElement>, 'color' | 'onClick'> {
  name: 'alipay' | 'user' | 'setup';
  size?: number;
  color?: string | string[];
  onClick?: MouseEventHandler<HTMLButtonElement>;
  buttonProps?: ButtonProps;
}

declare const IconFont: FunctionComponent<Props>;

export default IconFont;
