"use client";

import { APP_NAME } from "@lir/lib";
import type { DocumentProps } from "@lir/lib/schema";
import { Button, Icons } from "@lir/ui";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useDocumentTitle } from "usehooks-ts";

import Link from "next/link";

import { documentApi, documentModel } from "~/entities/document";
import { sessionModel } from "~/entities/session";

import { Editor } from "./editor";

export type EditorBoundaryProps = {
  documentId: string;
};

export const EditorBoundary = ({ documentId }: EditorBoundaryProps) => {
  const isAuth = sessionModel.useAuth();

  if (!isAuth) {
    return <PublicViewerEditor documentId={documentId} />;
  }

  return <LoggedInViewerEditor documentId={documentId} />;
};

const PublicViewerEditor = ({ documentId }: EditorBoundaryProps) => {
  const documentFromStore = documentModel.useDocument(documentId);
  const currentDocumentId = documentModel.useCurrentDocument();
  const currentDocumentFromStore = documentModel.useDocument(
    currentDocumentId || ""
  );
  const [document, setDocument] = useState<DocumentProps>();

  useDocumentTitle(document ? document.title ?? "Untitled" : APP_NAME);

  useEffect(() => {
    setDocument(
      currentDocumentId === documentId ? currentDocumentFromStore : documentFromStore
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId]);

  if (!document) {
    return <NotFoundDocument />;
  }

  return <Editor document={document} />;
};

const LoggedInViewerEditor = ({ documentId }: EditorBoundaryProps) => {
  const { data: document } = useQuery({
    queryKey: documentApi.documentKeys.query.getDocumentData(documentId),
    queryFn: () => documentApi.getDocumentData({ documentId }),
    refetchOnWindowFocus: false,
  });

  useDocumentTitle(document ? document.title ?? "Untitled" : APP_NAME);

  if (!document) {
    return <NotFoundDocument />;
  }

  return <Editor document={document} />;
};

const NotFoundDocument = () => (
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
