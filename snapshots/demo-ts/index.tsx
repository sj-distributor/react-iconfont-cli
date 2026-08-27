/* tslint:disable */
/* eslint-disable */

import React, { ButtonHTMLAttributes, CSSProperties, FunctionComponent, MouseEventHandler, ReactElement, SVGAttributes } from 'react';
import IconAlipay from './IconAlipay';
import IconUser from './IconUser';
import IconSetup from './IconSetup';
export { default as IconAlipay } from './IconAlipay';
export { default as IconUser } from './IconUser';
export { default as IconSetup } from './IconSetup';

export type IconNames = 'alipay' | 'user' | 'setup';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label' | 'children' | 'dangerouslySetInnerHTML' | 'onClick'>;

type IconProps = Omit<SVGAttributes<SVGElement>, 'color' | 'onClick'> & {
  size?: number;
  color?: string | string[];
};

interface Props extends IconProps {
  name: IconNames;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  buttonProps?: ButtonProps;
}

const DEFAULT_BUTTON_STYLE: CSSProperties = {
  appearance: 'none',
  background: 'transparent',
  border: 0,
  cursor: 'pointer',
  padding: 0,
};

const splitInteractiveProps = (props: IconProps) => {
  const source = props as Record<string, unknown>;
  const buttonA11yProps: Record<string, unknown> = {};
  const iconProps: Record<string, unknown> = {};

  Object.keys(source).forEach((propName) => {
    if (
      propName.indexOf('aria-') === 0 ||
      propName === 'role' ||
      propName === 'tabIndex'
    ) {
      buttonA11yProps[propName] = source[propName];
    } else {
      iconProps[propName] = source[propName];
    }
  });

  return {
    buttonA11yProps: buttonA11yProps as ButtonHTMLAttributes<HTMLButtonElement>,
    iconProps: iconProps as IconProps,
  };
};

const getAccessibleLabel = (iconName: string): string => {
  const label = iconName
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/[-_.=+#@!~*]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return label || iconName;
};

const IconFont: FunctionComponent<Props> = ({
  name,
  onClick,
  buttonProps = {},
  'aria-label': ariaLabel,
  ...rest
}) => {
  const interactiveProps = splitInteractiveProps(rest);
  const iconProps = onClick
    ? { ...interactiveProps.iconProps, 'aria-hidden': true }
    : { ...rest, 'aria-label': ariaLabel };
  let icon: ReactElement | null = null;

  switch (name) {
    case 'alipay':
      icon = <IconAlipay {...iconProps} />;
      break;
    case 'user':
      icon = <IconUser {...iconProps} />;
      break;
    case 'setup':
      icon = <IconSetup {...iconProps} />;
      break;

  }

  if (!icon || !onClick) {
    return icon;
  }

  const { style: buttonStyle, type = 'button', ...restButtonProps } = buttonProps;
  const safeButtonProps = restButtonProps as ButtonHTMLAttributes<HTMLButtonElement>;
  delete safeButtonProps.dangerouslySetInnerHTML;
  const style = buttonStyle
    ? { ...DEFAULT_BUTTON_STYLE, ...buttonStyle }
    : DEFAULT_BUTTON_STYLE;
  const accessibilityLabel =
    typeof ariaLabel === 'string' && ariaLabel.trim()
      ? ariaLabel.trim()
      : getAccessibleLabel(name);

  return (
    <button
      {...interactiveProps.buttonA11yProps}
      {...safeButtonProps}
      type={type}
      aria-label={accessibilityLabel}
      onClick={onClick}
      style={style}
    >
      {icon}
    </button>
  );
};

export default IconFont;
