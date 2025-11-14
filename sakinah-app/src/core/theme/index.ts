/**
 * Sakinah App - Main Theme Export
 */

import { Colors, getThemedColors, ColorScheme } from './colors';
import { Spacing, BorderRadius, TouchTarget } from './spacing';
import { Typography, FontSizes, FontWeights, LineHeights } from './typography';

export const Theme = {
  colors: Colors,
  spacing: Spacing,
  borderRadius: BorderRadius,
  touchTarget: TouchTarget,
  typography: Typography,
  fontSizes: FontSizes,
  fontWeights: FontWeights,
  lineHeights: LineHeights,
};

export { Colors, Spacing, BorderRadius, TouchTarget, Typography, FontSizes, FontWeights, LineHeights, getThemedColors };
export type { ColorScheme };

export default Theme;
