import { useMutation } from "@tanstack/react-query";
import { baseKeymap } from "prosemirror-commands";
import { history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { Schema, Node as ProseMirrorNode } from "prosemirror-model";
import { EditorState, type Plugin } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { useRef, useEffect } from "react";

import { documentApi, documentModel } from "~/entities/document";
import { editorModel } from "~/entities/editor";
import { sessionModel } from "~/entities/session";

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
  const isAuth = sessionModel.useAuth();

  const setEditorView = editorModel.useEditorStore().setView;
  const setEditorState = editorModel.useEditorStore().setState;

  const { mutateAsync } = useMutation({
    mutationKey: documentApi.documentKeys.mutation.updateDocument(),
    mutationFn: documentApi.updateDocument,
  });

  const updateDocument = (id: string, content: any) => {
    if (isAuth) {
      mutateAsync({
        id,
        content,
      }).then((updatedDoc) => {
        documentModel.setDocument({
          id: updatedDoc.id,
          content: updatedDoc.content,
        });
      });
    } else {
      documentModel.setDocument({
        id,
        content,
      });
    }
  };

  useEffect(() => {
    if (!currentDocument) return;

    const schema = new Schema({ nodes, marks });

    const plugins: Plugin[] = [
      keymap(baseKeymap),
      keymap(buildKeyMap(schema)),
      history(),
    ];

    let doc: ProseMirrorNode;

    if (!initialDoc || !Object.keys(initialDoc).length) {
      doc = ProseMirrorNode.fromJSON(schema, defaultDoc);
    } else if (initialDoc instanceof ProseMirrorNode) {
      doc = initialDoc;
    } else {
      doc = ProseMirrorNode.fromJSON(schema, initialDoc);
    }

    const state = EditorState.create({ schema, doc, plugins });
    setEditorState(state);

    viewRef.current = new EditorView(ref.current, {
      state,
      async dispatchTransaction(tr) {
        const prevState = viewRef.current.state;
        const nextState = viewRef.current.state.apply(tr);

        setEditorState(nextState);

        if (!prevState.doc.eq(nextState.doc)) {
          updateDocument(currentDocument.id, nextState.doc);
        }

        viewRef.current.updateState(nextState);
      },
    });

    setEditorView(viewRef);

    viewRef.current.dom.focus();

    return () => viewRef.current.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDocument]);

  return { ref };
};
