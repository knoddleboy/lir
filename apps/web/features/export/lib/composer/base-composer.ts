import type { FileFormat, MIMEType } from "~/shared";

export abstract class BaseComposer<T> {
  protected abstract format: FileFormat;
  protected abstract mimeType: MIMEType;

  public content: T;
  public exportedFileName: string;

  constructor(content: T, exportedFileName: string) {
    this.content = content;
    this.exportedFileName = exportedFileName;
  }

  public abstract compose(): void;

  protected downloadComposed(composedContent: any): void {
    const blob = new Blob([composedContent], { type: this.mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `${this.exportedFileName}.${this.format}`;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
