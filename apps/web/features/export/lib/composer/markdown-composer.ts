import type { Node } from "prosemirror-model";

import { markdownSerializer } from "~/entities/editor";
import { FileFormat } from "~/shared";

import { BaseComposer } from "./base-composer";

export class MarkdownComposer extends BaseComposer<Node> {
  protected format = FileFormat.Markdown;
  protected mimeType = "text/markdown" as const;

  constructor(content: Node, fileName: string) {
    super(content, fileName);
  }

  public compose() {
    const composed = markdownSerializer.serialize(this.content);
    this.downloadComposed(composed);
  }
}
