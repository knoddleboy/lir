import { cn } from "@lir/lib";
import { Button } from "@lir/ui";

import { toggleMark } from "prosemirror-commands";
import { type MarkType } from "prosemirror-model";
import { useCallback } from "react";

import { documentModel } from "~/entities/document";
import { editorModel } from "~/entities/editor";

export const MarkFormats = () => {
  const document = documentModel.useCurrentDocument();
  const editorView = editorModel.useEditorStore((state) => state.view?.current);
  const editorState = editorModel.useEditorStore((state) => state.state);
  const editorSchema = editorState?.schema;
  const disabled = !document || !editorView || !editorState;

  const isMarkActive = useCallback(
    (markType: MarkType | undefined) => {
      if (disabled || !markType) return false;

      const { state } = editorView;
      const { from, $from, to, empty } = state.selection;

      if (empty) {
        return !!markType.isInSet(state.storedMarks || $from.marks());
      }

      return state.doc.rangeHasMark(from, to, markType);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editorView]
  );

  const isBold = isMarkActive(editorSchema?.marks.strong);
  const isItalic = isMarkActive(editorSchema?.marks.em);
  const isUnderline = isMarkActive(editorSchema?.marks.underline);
  const isStrikethrough = isMarkActive(editorSchema?.marks.strikethrough);

  const applyMark = useCallback(
    (markType: MarkType | undefined) => {
      if (disabled || !markType) return;

      // Keep selection.
      editorView.focus();

      const { state, dispatch } = editorView;
      toggleMark(markType)(state, dispatch);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editorView]
  );

  return (
    <div className={cn("flex items-center gap-0.5", disabled && "opacity-40")}>
      <Button
        variant="control-ghost"
        className={cn(
          "disabled:active:bg-control disabled:active:text-accent-foreground/60 h-5 w-6 select-none rounded-sm p-1 font-extrabold",
          isBold &&
            "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground"
        )}
        onClick={() => {
          applyMark(editorSchema?.marks.strong);
        }}
        disabled={disabled}
      >
        B
      </Button>

      <Button
        variant="control-ghost"
        className={cn(
          "disabled:active:bg-control disabled:active:text-accent-foreground/60 h-5 w-6 select-none rounded-sm p-1 font-serif font-medium italic",
          isItalic &&
            "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground"
        )}
        onClick={() => {
          applyMark(editorSchema?.marks.em);
        }}
        disabled={disabled}
      >
        I
      </Button>

      <Button
        variant="control-ghost"
        className={cn(
          "disabled:active:bg-control disabled:active:text-accent-foreground/60 h-5 w-6 select-none rounded-sm p-1 font-medium underline",
          isUnderline &&
            "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground"
        )}
        onClick={() => {
          applyMark(editorSchema?.marks.underline);
        }}
        disabled={disabled}
      >
        U
      </Button>

      <Button
        variant="control-ghost"
        className={cn(
          "disabled:active:bg-control disabled:active:text-accent-foreground/60 h-5 w-6 select-none rounded-sm p-1 font-medium line-through",
          isStrikethrough &&
            "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground"
        )}
        onClick={() => {
          applyMark(editorSchema?.marks.strikethrough);
        }}
        disabled={disabled}
      >
        S
      </Button>
    </div>
  );
};
