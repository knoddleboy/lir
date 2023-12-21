"use client";

import { APP_NAME } from "@lir/lib";

import { useDocumentTitle } from "usehooks-ts";

import { documentModel } from "~/entities/document";
import { extractURIHash } from "~/shared";

type Props = {
  params: {
    documentId: string;
  };
};

export default function WorkspacePage({ params: { documentId } }: Props) {
  const document = documentModel.useDocument(extractURIHash(documentId)!);

  useDocumentTitle(document ? document.title ?? "Untitled" : APP_NAME);

  return <div></div>;
}
