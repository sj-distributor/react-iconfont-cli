/* eslint-disable */

/**
 * @param {string | string[] | undefined} color
 * @param {number} index
 * @param {string} defaultColor
 * @return {string}
 */
export const getIconColor = (color, index, defaultColor, primaryColor) => {
  if (!color) return defaultColor;

  // When color is a single value, only tint primary paths. Detail paths
  // (whose defaultColor differs from the icon's primary fill) stay unchanged.
  if (typeof color === 'string') {
    return defaultColor === primaryColor ? color : defaultColor;
  }

  return color[index] || defaultColor;
};
