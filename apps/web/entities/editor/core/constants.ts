export type Alignment = "left" | "center" | "right" | "justify";

export const LineSpacings = [1.0, 1.15, 1.2, 1.5, 2.0] as const;
export type LineSpacing = (typeof LineSpacings)[number];
export const defaultLineSpacing: LineSpacing = 1.2;

export const FontSizes = [10, 12, 13, 14, 16, 18, 24, 32, 48] as const;
export type FontSize = (typeof FontSizes)[number];
export const defaultFontSize: FontSize = 16;
