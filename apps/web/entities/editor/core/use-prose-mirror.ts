import { useMutation } from "@tanstack/react-query";
import { baseKeymap } from "prosemirror-commands";
import { history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { Node as ProseMirrorNode } from "prosemirror-model";
import { EditorState, type Plugin } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { useRef, useEffect } from "react";

import { documentApi, documentModel } from "~/entities/document";
import { editorModel } from "~/entities/editor";
import { sessionModel } from "~/entities/session";

import { buildKeyMap } from "./keymap";
import { TransactionQueue } from "./queue/transaction-queue";
import schema from "./schema";

const defaultDoc = {
  type: "doc",
  content: [
    {
      type: "paragraph",
    },
  ],
};

const editorStateCache = new Map<string, EditorState>();

export const useProseMirror = (initialDoc?: ProseMirrorNode) => {
  const ref = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView>(null!);
  const currentDocumentId = documentModel.useCurrentDocument();
  const isAuth = sessionModel.useAuth();

  const setEditorView = editorModel.useEditorStore().setView;
  const setEditorState = editorModel.useEditorStore().setState;

  const { mutateAsync } = useMutation({
    mutationKey: documentApi.documentKeys.mutation.updateDocument(),
    mutationFn: documentApi.updateDocument,
  });

  const transactionQueue = useRef(new TransactionQueue(mutateAsync));

  const updateDocument = (id: string, content: ProseMirrorNode) => {
    if (isAuth) {
      transactionQueue.current.enqueue({ id, content });
    }

    documentModel.setDocument({
      id,
      content,
    });
  };

  useEffect(() => {
    if (!currentDocumentId) return;

    const plugins: Plugin[] = [
      keymap(baseKeymap),
      keymap(buildKeyMap(schema)),
      history(),
    ];

    let state = editorStateCache.get(currentDocumentId);

    if (!state) {
      let doc: ProseMirrorNode;

      if (!initialDoc || !Object.keys(initialDoc).length) {
        doc = ProseMirrorNode.fromJSON(schema, defaultDoc);
      } else if (initialDoc instanceof ProseMirrorNode) {
        doc = initialDoc;
      } else {
        doc = ProseMirrorNode.fromJSON(schema, initialDoc);
      }

      state = EditorState.create({ schema, doc, plugins });
      editorStateCache.set(currentDocumentId, state);
    }

    setEditorState(state);

    viewRef.current = new EditorView(ref.current, {
      state,
      async dispatchTransaction(tr) {
        const prevState = viewRef.current.state;
        const nextState = viewRef.current.state.apply(tr);

        setEditorState(nextState);

        if (!prevState.doc.eq(nextState.doc)) {
          updateDocument(currentDocumentId, nextState.doc);
        }

        viewRef.current.updateState(nextState);
      },
    });

    setEditorView(viewRef);

    viewRef.current.dom.focus();

    return () => {
      editorStateCache.set(currentDocumentId, viewRef.current.state);
      viewRef.current.destroy();
      setEditorView(null);
      documentModel.setCurrentDocument(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDocumentId]);

  return { ref };
};
