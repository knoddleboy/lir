import { type MIMEType } from "~/shared";

import { MarkdownParser } from "./markdown-parser";
import { PlainTextParser } from "./plain-text-parser";

export function fileParser(fileContent: string, mimeType: MIMEType) {
  switch (mimeType) {
    case "text/plain":
      return new PlainTextParser(fileContent);
    case "text/markdown":
      return new MarkdownParser(fileContent);
    default:
      throw new Error(
        "The selected file type is not supported yet. Please choose a different file format."
      );
  }
}
