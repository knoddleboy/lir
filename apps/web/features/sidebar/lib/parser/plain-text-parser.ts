import type { Node } from "prosemirror-model";

import { schema } from "~/entities/editor";

import type { FileParser } from "./type";

export class PlainTextParser implements FileParser<string> {
  content: string;

  constructor(content: string) {
    this.content = content;
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
