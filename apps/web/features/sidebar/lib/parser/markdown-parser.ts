import MarkdownIt, { type Token } from "markdown-it";
import { MarkdownParser as PMMarkdownParser } from "prosemirror-markdown";

import { getHeadingFontSize, schema } from "~/entities/editor";
import { FileFormat } from "~/shared";

import { BaseParser } from "./base-parser";

const md = MarkdownIt("commonmark");

const nodeSpec = {
  paragraph: {
    block: "paragraph",
    getAttrs: () => {
      return {
        align: "left",
        lineSpacing: 1.2,
      };
    },
  },

  heading: {
    block: "heading",
    getAttrs: (token: Token) => {
      const level = +token.tag.slice(1);

      return {
        level,
        align: "left",
        lineSpacing: 1.2,
        marks: [
          {
            type: "fontSize",
            attrs: { size: getHeadingFontSize(level) },
          },
        ],
      };
    },
  },

  horizontal_rule: {
    node: "horizontal_rule",
    getAttrs: () => null,
  },

  hard_break: {
    node: "hard_break",
    getAttrs: () => null,
  },
};

const markSpec = {
  em: { mark: "em" },
  strong: { mark: "strong" },
  strikethrough: { mark: "strikethrough" },
};

const parser = new PMMarkdownParser(schema, md, { ...nodeSpec, ...markSpec });

export class MarkdownParser extends BaseParser<string> {
  protected format = FileFormat.Markdown;
  protected mimeType = "text/markdown" as const;

  constructor(content: string) {
    super(content);
  }

  parse() {
    const parsedDoc = parser.parse(this.content);
    return parsedDoc!;
  }
}
