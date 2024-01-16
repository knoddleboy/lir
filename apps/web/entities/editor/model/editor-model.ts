import type { EditorState } from "prosemirror-state";
import type { EditorView } from "prosemirror-view";
import type { MutableRefObject } from "react";
import { create, type StateCreator } from "zustand";

type EditorViewState = {
  view: MutableRefObject<EditorView> | null;
  setView: (view: MutableRefObject<EditorView> | null) => void;
};

type EditorStateState = {
  state: EditorState | null;
  setState: (state: EditorState) => void;
};

const createEditorViewSlice: StateCreator<EditorViewState> = (set) => ({
  view: null,

  setView: (view) => {
    set({ view });
  },
});

const createEditorStateSlice: StateCreator<EditorStateState> = (set) => ({
  state: null,

  setState: (state) => {
    set({ state });
  },
});

export const useEditorStore = create<EditorViewState & EditorStateState>((...a) => ({
  ...createEditorViewSlice(...a),
  ...createEditorStateSlice(...a),
}));
