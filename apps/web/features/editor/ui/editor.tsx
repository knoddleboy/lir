"use client";

import type { DocumentProps } from "@lir/lib/schema";

import type { Node } from "prosemirror-model";
import { memo, useEffect } from "react";

import { documentModel } from "~/entities/document";
import { editorModel } from "~/entities/editor";

import { ProseEditor } from "./prose-editor";

type Props = {
  document: DocumentProps;
};

export const Editor = memo(({ document }: Props) => {
  const editorView = editorModel.useEditorStore((state) => state.view?.current);

  useEffect(() => {
    documentModel.setCurrentDocument(document.id);
  }, [document]);

  return (
    <div
      className="h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth"
      onClick={() => {
        editorView?.focus();
      }}
    >
      <div className="grid w-full grid-cols-[minmax(70px,1fr)_minmax(auto,700px)_minmax(70px,1fr)] pb-[20vh]">
        <div className="col-span-1 col-start-2 pt-6">
          <ProseEditor doc={document.content as Node} />
        </div>
      </div>
    </div>
  );
});
Editor.displayName = "Editor";
