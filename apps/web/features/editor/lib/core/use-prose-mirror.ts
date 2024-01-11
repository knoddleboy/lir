import { useMutation } from "@tanstack/react-query";
import { baseKeymap } from "prosemirror-commands";
import { history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { Schema, Node as ProseMirrorNode } from "prosemirror-model";
import { EditorState, type Plugin } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { useRef, useEffect } from "react";

import { documentApi, documentModel } from "~/entities/document";

import { buildKeyMap } from "./keymap";
import { nodes, marks } from "./schema";

const defaultDoc = {
  type: "doc",
  content: [
    {
      type: "paragraph",
    },
  ],
};

export const useProseMirror = (initialDoc?: ProseMirrorNode) => {
  const ref = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView>(null!);

  const currentDocument = documentModel.useCurrentDocument();

  const { mutateAsync: updateDocument } = useMutation({
    mutationKey: documentApi.documentKeys.mutation.updateDocument(),
    mutationFn: documentApi.updateDocument,
  });

  useEffect(() => {
    if (!currentDocument) return;

    const schema = new Schema({ nodes, marks });

    const plugins: Plugin[] = [
      keymap(baseKeymap),
      keymap(buildKeyMap(schema)),
      history(),
    ];

    const doc = ProseMirrorNode.fromJSON(
      schema,
      initialDoc && Object.keys(initialDoc).length ? initialDoc : defaultDoc
    );
    const state = EditorState.create({ schema, doc, plugins });

    viewRef.current = new EditorView(ref.current, {
      state,
      async dispatchTransaction(tr) {
        const prevState = viewRef.current.state;
        const nextState = viewRef.current.state.apply(tr);

        if (!prevState.doc.eq(nextState.doc)) {
          const updatedDoc = await updateDocument({
            id: currentDocument,
            content: nextState.doc,
          });
          documentModel.setDocument({
            id: updatedDoc.id,
            title: updatedDoc.title,
            content: updatedDoc.content,
          });
        }

        viewRef.current.updateState(nextState);
      },
    });

    viewRef.current.dom.focus();

    return () => viewRef.current.destroy();
  }, [currentDocument]);

  return { ref };
};
