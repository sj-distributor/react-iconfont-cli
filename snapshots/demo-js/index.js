/* eslint-disable */

import React from 'react';
import IconAlipay from './IconAlipay';
import IconUser from './IconUser';
import IconSetup from './IconSetup';
export { default as IconAlipay } from './IconAlipay';
export { default as IconUser } from './IconUser';
export { default as IconSetup } from './IconSetup';

const DEFAULT_BUTTON_STYLE = {
  appearance: 'none',
  background: 'transparent',
  border: 0,
  padding: 0,
};

const splitInteractiveProps = (props) => {
  const buttonA11yProps = {};
  const iconProps = {};

  Object.keys(props).forEach((propName) => {
    if (
      propName.indexOf('aria-') === 0 ||
      propName === 'role' ||
      propName === 'tabIndex'
    ) {
      buttonA11yProps[propName] = props[propName];
    } else {
      iconProps[propName] = props[propName];
    }
  });

  return { buttonA11yProps, iconProps };
};

const getAccessibleLabel = (iconName) => {
  const label = iconName
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/[-_.=+#@!~*]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return label || iconName;
};

const IconFont = ({
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
  let icon = null;

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
  delete restButtonProps.dangerouslySetInnerHTML;
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
      {...restButtonProps}
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
