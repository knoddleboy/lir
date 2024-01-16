import { cn } from "@lir/lib";
import { Button } from "@lir/ui";

import { toggleMark } from "prosemirror-commands";
import { type MarkType } from "prosemirror-model";
import { useCallback, useEffect, useState } from "react";

import { documentModel } from "~/entities/document";
import { editorModel } from "~/entities/editor";
import { schema as editorSchema } from "~/entities/editor";

const strongMark = editorSchema.marks.strong;
const emMark = editorSchema.marks.em;
const underlineMark = editorSchema.marks.underline;
const strikethroughMark = editorSchema.marks.strikethrough;

export const MarkFormats = () => {
  const document = documentModel.useCurrentDocument();
  const editorView = editorModel.useEditorStore((state) => state.view?.current);
  const editorState = editorModel.useEditorStore((state) => state.state);
  const disabled = !document || !editorView;

  const [currentMarks, setCurrentMarks] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
  });

  useEffect(() => {
    const isMarkActive = (markType: MarkType | undefined) => {
      if (disabled || !markType) return false;

      const { state } = editorView;
      const { from, $from, to, empty } = state.selection;

      if (empty) {
        return !!markType.isInSet(state.storedMarks || $from.marks());
      }

      return state.doc.rangeHasMark(from, to, markType);
    };

    const isBold = isMarkActive(strongMark);
    const isItalic = isMarkActive(emMark);
    const isUnderline = isMarkActive(underlineMark);
    const isStrikethrough = isMarkActive(strikethroughMark);

    setCurrentMarks((prevMarks) => ({
      ...prevMarks,
      bold: isBold,
      italic: isItalic,
      underline: isUnderline,
      strikethrough: isStrikethrough,
    }));
  }, [disabled, editorView, editorState]);

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
        {
          markType: strongMark,
          isActive: currentMarks.bold,
          label: "B",
          style: "font-extrabold",
        },
        {
          markType: emMark,
          isActive: currentMarks.italic,
          label: "I",
          style: "font-serif font-medium italic",
        },
        {
          markType: underlineMark,
          isActive: currentMarks.underline,
          label: "U",
          style: "font-medium underline",
        },
        {
          markType: strikethroughMark,
          isActive: currentMarks.strikethrough,
          label: "S",
          style: "font-medium line-through",
        },
      ].map(({ markType, isActive, label, style }) => (
        <Button
          key={label}
          variant="control-ghost"
          className={cn(
            "disabled:active:bg-control disabled:active:text-accent-foreground/60 h-5 w-6 select-none rounded-sm p-1",
            isActive &&
              "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground",
            style
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
