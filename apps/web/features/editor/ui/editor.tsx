"use client";

import type { DocumentProps } from "@lir/lib/schema";

import type { Node } from "prosemirror-model";
import { memo, useEffect } from "react";

import { documentModel } from "~/entities/document";

import { ProseEditor } from "./prose-editor";

type Props = {
  document: DocumentProps;
};

export const Editor = memo(({ document }: Props) => {
  useEffect(() => {
    documentModel.setCurrentDocument(document);
  }, [document]);

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth">
      <div className="grid w-full grid-cols-[minmax(70px,1fr)_minmax(auto,700px)_minmax(70px,1fr)] pb-[20vh]">
        <div className="col-span-1 col-start-2 pt-8">
          <ProseEditor doc={document.content as Node} />
        </div>
      </div>
    </div>
  );
});
Editor.displayName = "Editor";
