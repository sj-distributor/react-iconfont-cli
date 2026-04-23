/* eslint-disable */

/**
 * @param {string | string[] | undefined} color
 * @param {number} index
 * @param {string} defaultColor
 * @return {string}
 */
export const getIconColor = (color, index, defaultColor) => {
  if (!color) return defaultColor;

  // When color is a single value, only tint the first path.
  if (typeof color === "string") {
    return index === 0 ? color : defaultColor;
  }

  return color[index] || defaultColor;
};
