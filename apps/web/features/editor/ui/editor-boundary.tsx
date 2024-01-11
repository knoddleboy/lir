"use client";

import { APP_NAME } from "@lir/lib";
import { Button, Icons } from "@lir/ui";

import { useDocumentTitle } from "usehooks-ts";

import Link from "next/link";

import { extractURIHash } from "~/shared";

import { useGetDocumentData } from "../api";
import { Editor } from "./editor";

export type EditorBoundaryProps = {
  documentId: string;
};

export const EditorBoundary = ({ documentId }: EditorBoundaryProps) => {
  const { data: document } = useGetDocumentData(extractURIHash(documentId)!);

  useDocumentTitle(document ? document.title ?? "Untitled" : APP_NAME);

  if (!document) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="text-muted-foreground/60 select-none text-2xl">
            Document not found
          </div>
          <Button
            className="text-muted-foreground/80 h-fit select-none px-1.5 py-0.5 font-medium dark:font-normal"
            variant="control-ghost"
            text="sm"
            asChild
          >
            <Link href="/d">
              <Icons.arrowLeft size={14} className="mr-1" /> Back to Overview
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return <Editor document={document} />;
};
