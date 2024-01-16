import type { Node } from "prosemirror-model";

import { FileFormat } from "~/shared";

import { BaseComposer } from "./base-composer";

export class PlainTextComposer extends BaseComposer<Node> {
  protected format = FileFormat.TXT;
  protected mimeType = "text/plain" as const;

  constructor(content: Node, fileName: string) {
    super(content, fileName);
  }

  public compose() {
    const composed = this.content.textBetween(0, this.content.content.size, "\n");
    this.downloadComposed(composed);
  }
}
