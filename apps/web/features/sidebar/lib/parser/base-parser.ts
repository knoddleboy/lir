import type { Node } from "prosemirror-model";

import type { FileFormat, MIMEType } from "~/shared";

export abstract class BaseParser<T> {
  protected abstract format: FileFormat;
  protected abstract mimeType: MIMEType;

  public content: T;

  constructor(content: T) {
    this.content = content;
  }

  public abstract parse(): Node;
}
