"use client";

import dynamic from "next/dynamic";

import { type EditorBoundaryProps } from "./editor-boundary";

const EditorBoundary = dynamic<EditorBoundaryProps>(
  () => import("./editor-boundary").then((mod) => mod.EditorBoundary),
  { ssr: false }
);

export const EditorContainer = ({ documentId }: EditorBoundaryProps) => {
  return <EditorBoundary documentId={documentId} />;
};
