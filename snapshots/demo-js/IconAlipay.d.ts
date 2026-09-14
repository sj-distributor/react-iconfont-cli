/* eslint-disable */

import { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  size?: number;
  color?: string | string[];
}

declare const IconAlipay: ForwardRefExoticComponent<Props & RefAttributes<SVGSVGElement>>;

export default IconAlipay;
