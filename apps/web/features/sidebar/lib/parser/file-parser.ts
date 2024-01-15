import { PlainTextParser } from "./plain-text-parser";

export function fileParser(fileContent: string, fileType: string) {
  switch (fileType) {
    case "text/plain":
      return new PlainTextParser(fileContent);
    default:
      throw new Error(
        "The selected file type is not supported yet. Please choose a different file format."
      );
  }
}
