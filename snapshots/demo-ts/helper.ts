/* tslint:disable */
/* eslint-disable */

export const getIconColor = (color: string | string[] | undefined, index: number, defaultColor: string, primaryColor: string) => {
  if (!color) return defaultColor;

  // When color is a single value, only tint primary paths. Detail paths
  // (whose defaultColor differs from the icon's primary fill) stay unchanged.
  if (typeof color === 'string') {
    return defaultColor === primaryColor ? color : defaultColor;
  }

  return color[index] || defaultColor;
};
