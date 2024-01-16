"use client";

import { cn } from "@lir/lib";
import type { DocumentProps } from "@lir/lib/schema";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Icons,
} from "@lir/ui";

import { memo } from "react";
import { toast } from "sonner";

import { documentModel } from "~/entities/document";
import { editorModel } from "~/entities/editor";
import type { MIMEType } from "~/shared";

import { documentComposer } from "./lib";

export const Export = () => {
  const currentDocumentId = documentModel.useCurrentDocument();
  const currentDocument = documentModel.useDocument(currentDocumentId || "");
  const disabled = !currentDocument;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="control-ghost"
          size="control-icon"
          className={cn(
            "text-accent-foreground/70 h-6",
            disabled &&
              "active:text-accent-foreground/70 active:bg-control opacity-40"
          )}
          disabled={disabled}
        >
          <Icons.export size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        {currentDocument && (
          <ExportDocumentDialogContent document={currentDocument} />
        )}
      </DialogContent>
    </Dialog>
  );
};

type ExportDocumentButtonProps = {
  label: string;
  icon: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const ExportDocumentButton = ({
  label,
  icon,
  className,
  onClick,
}: ExportDocumentButtonProps) => {
  return (
    <button
      className={cn(
        "_ring bg-accent hover:bg-muted-foreground/10 active:bg-muted-foreground/[0.15] border-muted-foreground/20 flex h-8 w-full items-center justify-center gap-2 rounded-md border",
        className
      )}
      onClick={onClick}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
};

const ExportDocumentDialogContent = memo(
  ({ document }: { document: DocumentProps }) => {
    const editorView = editorModel.useEditorStore((state) => state.view)?.current;

    const handleExport = (mimeType: MIMEType) => {
      try {
        if (!editorView) return;

        const content = editorView.state.doc;
        const title = document.title;
        const fileName = title !== null ? title : "Untitled Document";

        const composer = documentComposer(content, fileName, mimeType);

        composer.compose();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };

    return (
      <>
        <DialogHeader>
          <DialogTitle>Export</DialogTitle>
          <DialogDescription>
            Export document{" "}
            {document.title !== null ? (
              <span className="font-medium">{document.title}</span>
            ) : (
              <span className="font-medium italic">Untitled Document</span>
            )}{" "}
            into one of the following formats:
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2">
          <ExportDocumentButton
            label="Plain text"
            icon={<Icons.alignLeft size={16} />}
            className="col-span-2"
            onClick={() => handleExport("text/plain")}
          />
        </div>
      </>
    );
  }
);
ExportDocumentDialogContent.displayName = "ExportDocumentDialogContent";
