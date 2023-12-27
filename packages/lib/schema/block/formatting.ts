import { z } from "zod";

import { constructZodLiteralUnionType } from "../../constructZodLiteralUnionType";
import type { BlockType } from "./block";

export enum Emphasis {
  Regular = "r",
  Bold = "b",
  Italic = "i",
  Underline = "u",
  Strikethrough = "s",
}

export const FontSizes = [10, 12, 13, 14, 16, 18, 24, 32, 48] as const;

export type FontSize = (typeof FontSizes)[number];

export const typeFormatsMapping: Record<BlockType, BlockContent["formats"]> = {
  text: {
    emphasis: [Emphasis.Regular],
    fontSize: 16,
  },
  title: {
    emphasis: [Emphasis.Bold],
    fontSize: 32,
  },
  heading1: {
    emphasis: [Emphasis.Bold],
    fontSize: 24,
  },
  heading2: {
    emphasis: [Emphasis.Bold],
    fontSize: 18,
  },
};

export enum Alignment {
  Left = "l",
  Center = "c",
  Right = "r",
  Justify = "j",
}

export const LineSpacings = [1.0, 1.15, 1.2, 1.5, 2.0] as const;

export type LineSpacing = (typeof LineSpacings)[number];

export const blockContentSchema = z.object({
  title: z.array(
    z.tuple([z.string()]).rest(z.array(z.array(z.nativeEnum(Emphasis))))
  ),
  formats: z.object({
    emphasis: z.array(z.nativeEnum(Emphasis)),
    fontSize: constructZodLiteralUnionType(
      FontSizes.map((literal) => z.literal(literal))
    ),
  }),
  alignment: z.nativeEnum(Alignment),
  lineSpacing: constructZodLiteralUnionType(
    LineSpacings.map((literal) => z.literal(literal))
  ),
});

export type BlockContent = z.infer<typeof blockContentSchema>;
