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
  const disabled = !document || !editorView;

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
    [disabled, editorView]
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
    [disabled, editorView]
  );

  return (
    <div className={cn("flex items-center gap-0.5", disabled && "opacity-40")}>
      {[
        { markType: editorSchema?.marks.strong, isActive: isBold, label: "B" },
        { markType: editorSchema?.marks.em, isActive: isItalic, label: "I" },
        {
          markType: editorSchema?.marks.underline,
          isActive: isUnderline,
          label: "U",
        },
        {
          markType: editorSchema?.marks.strikethrough,
          isActive: isStrikethrough,
          label: "S",
        },
      ].map(({ markType, isActive, label }) => (
        <Button
          key={label}
          variant="control-ghost"
          className={cn(
            "disabled:active:bg-control disabled:active:text-accent-foreground/60 h-5 w-6 select-none rounded-sm p-1",
            isActive &&
              "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground",
            markType === editorSchema?.marks.strong && "font-extrabold",
            markType === editorSchema?.marks.em && "font-serif font-medium italic",
            markType === editorSchema?.marks.underline && "font-medium underline",
            markType === editorSchema?.marks.strikethrough &&
              "font-medium line-through"
          )}
          onClick={() => {
            applyMark(markType);
          }}
          disabled={disabled}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};
