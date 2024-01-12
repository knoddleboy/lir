import { type Schema } from "prosemirror-model";
import { type EditorState as PMEditorState } from "prosemirror-state";
import { type EditorView } from "prosemirror-view";
import { type MutableRefObject } from "react";
import { create, type StateCreator } from "zustand";

type EditorViewState = {
  view: MutableRefObject<EditorView>;
  setView: (view: MutableRefObject<EditorView>) => void;
};

type EditorSchemaState = {
  schema: Schema;
  setSchema: (schema: Schema) => void;
};

type EditorStateState = {
  state: PMEditorState;
  setState: (state: PMEditorState) => void;
};

const createEditorViewSlice: StateCreator<EditorViewState> = (set) => ({
  view: null!,

  setView: (view) => {
    set({ view });
  },
});

const createEditorSchemaSlice: StateCreator<EditorSchemaState> = (set) => ({
  schema: null!,

  setSchema: (schema) => {
    set({ schema });
  },
});

const createEditorStateSlice: StateCreator<EditorStateState> = (set) => ({
  state: null!,

  setState: (state) => {
    set({ state });
  },
});

type EditorState = EditorViewState & EditorSchemaState & EditorStateState;

export const useEditorStore = create<EditorState>((...a) => ({
  ...createEditorViewSlice(...a),
  ...createEditorSchemaSlice(...a),
  ...createEditorStateSlice(...a),
}));
