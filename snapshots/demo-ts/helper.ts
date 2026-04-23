/* tslint:disable */
/* eslint-disable */

export const getIconColor = (
  color: string | string[] | undefined,
  index: number,
  defaultColor: string,
) => {
  if (!color) return defaultColor;

  // When color is a single value, only tint the first path.
  if (typeof color === "string") {
    return index === 0 ? color : defaultColor;
  }

  return color[index] || defaultColor;
};
