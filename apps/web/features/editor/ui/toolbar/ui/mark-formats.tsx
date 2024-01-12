import { cn } from "@lir/lib";
import { Button } from "@lir/ui";

import { toggleMark } from "prosemirror-commands";
import { type MarkType } from "prosemirror-model";

import { documentModel } from "~/entities/document";
import { editorModel } from "~/entities/editor";

export const MarkFormats = () => {
  const document = documentModel.useCurrentDocument();
  const editorSchema = editorModel.useEditorStore().schema;
  const editorView = editorModel.useEditorStore().view?.current;
  const editorState = editorModel.useEditorStore().state;

  const disabled = !document || !editorSchema || !editorView || !editorState;

  const applyMark = (markType: MarkType) => {
    if (!editorView) return;

    // Keep selection.
    editorView.focus();

    const { state, dispatch } = editorView;
    toggleMark(markType)(state, dispatch);
  };

  const isMarkActive = (markType: MarkType | undefined) => {
    if (!editorState || !markType) return false;

    const { from, $from, to, empty } = editorState.selection;

    if (empty) {
      return !!markType.isInSet(editorState.storedMarks || $from.marks());
    }

    return editorState.doc.rangeHasMark(from, to, markType);
  };

  const isBold = isMarkActive(editorSchema?.marks.strong);
  const isItalic = isMarkActive(editorSchema?.marks.em);
  const isUnderline = isMarkActive(editorSchema?.marks.underline);
  const isStrikethrough = isMarkActive(editorSchema?.marks.strikethrough);

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
          applyMark(editorSchema.marks.strong);
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
          applyMark(editorSchema.marks.em);
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
          applyMark(editorSchema.marks.underline);
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
          applyMark(editorSchema.marks.strikethrough);
        }}
        disabled={disabled}
      >
        S
      </Button>
    </div>
  );
};
