"use client";

import type { DocumentProps } from "@lir/lib/schema";

import { useEffect } from "react";

import { documentModel } from "~/entities/document";

import { ProseEditor } from "./prose-editor";

type Props = {
  document: DocumentProps;
};

export const Editor = ({ document }: Props) => {
  useEffect(() => {
    documentModel.setCurrentDocument(document);
  }, [document]);

  // const { data: documentData } = useGetDocumentData(document.id);

  // const blocks = blockModel.useBlocks();
  // const setBlocks = blockModel.setBlocks;

  // useEffect(() => {
  //   if (!documentData || !documentData.blocks.length) return;

  //   // Check if a block is connected to this document; if not, it means we
  //   // have changed the document, and thus, we can dump the previous blocks.
  //   if (documentData.blocks[0].documentId !== document.id) {
  //     setBlocks([]);
  //   }

  //   if (!blocks.length) {
  //     const documentBlocks = documentData.blocks;
  //     setBlocks(documentBlocks);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [documentData, setBlocks]);

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth">
      <div className="grid w-full grid-cols-[minmax(70px,1fr)_minmax(auto,700px)_minmax(70px,1fr)] pb-[20vh]">
        <div className="col-span-1 col-start-2 pt-8">
          {/* {!blocks.length ? (
            <Skeleton className="h-7 w-full" />
          ) : (
            blocks.map((block) => {
              return <Block key={block.id} block={block} documentId={document.id} />;
            })
          )} */}
          <ProseEditor doc={document.content as any} />
        </div>
      </div>
    </div>
  );
};
