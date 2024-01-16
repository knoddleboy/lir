import type { Node } from "prosemirror-model";

import type { MIMEType } from "~/shared";

import { PlainTextComposer } from "./plain-text-composer";

export function documentComposer(
  documentContent: Node,
  fileName: string,
  mimeType: MIMEType
) {
  switch (mimeType) {
    case "text/plain":
      return new PlainTextComposer(documentContent, fileName);
    default:
      throw new Error(
        "The selected file type is not supported yet. Please choose a different file format."
      );
  }
}
