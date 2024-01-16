import type { Node } from "prosemirror-model";

import { schema } from "~/entities/editor";
import { FileFormat } from "~/shared";

import { BaseParser } from "./base-parser";

export class PlainTextParser extends BaseParser<string> {
  protected format = FileFormat.TXT;
  protected mimeType = "text/plain" as const;

  constructor(content: string) {
    super(content);
  }

  parse() {
    const paragraphs = this.content.split(/\r?\n/);
    const paragraphNodes: Node[] = [];

    paragraphs.forEach((paragraph) => {
      if (paragraph) {
        const paragraphNode = schema.node("paragraph", null, schema.text(paragraph));
        paragraphNodes.push(paragraphNode);
      } else {
        const emptyParagraphNode = schema.node("paragraph");
        paragraphNodes.push(emptyParagraphNode);
      }
    });

    const doc = schema.node("doc", null, paragraphNodes);

    return doc;
  }
}
