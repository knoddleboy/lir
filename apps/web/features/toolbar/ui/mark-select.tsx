import { cn } from "@lir/lib";
import {
  Icons,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@lir/ui";

import { type MarkType } from "prosemirror-model";
import { useCallback, useEffect, useState } from "react";

import { documentModel } from "~/entities/document";
import { editorModel } from "~/entities/editor";

enum Mark {
  Regular = "Regular",
  Bold = "Bold",
  Italic = "Italic",
  BoldItalic = "Bold Italic",
}

export const MarkSelect = () => {
  const document = documentModel.useCurrentDocument();
  const editorView = editorModel.useEditorStore((state) => state.view?.current);
  const editorState = editorModel.useEditorStore((state) => state.state);
  const editorSchema = editorState?.schema;
  const disabled = !document || !editorView || !editorState || !editorSchema;

  const [currentMark, setCurrentMark] = useState<Mark>(Mark.Regular);

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

  useEffect(() => {
    if (isBold && isItalic) {
      setCurrentMark(Mark.BoldItalic);
      return;
    }

    if (isBold) {
      setCurrentMark(Mark.Bold);
      return;
    }

    if (isItalic) {
      setCurrentMark(Mark.Italic);
      return;
    }

    setCurrentMark(Mark.Regular);
  }, [editorState, isBold, isItalic]);

  const applyMark = useCallback(
    (mark: Mark) => {
      if (disabled) return;

      // Keep selection.
      editorView.focus();

      const { state } = editorView;
      const { from, to } = state.selection;
      let transaction = state.tr;
      const marks = editorSchema.marks;

      if (mark === currentMark) {
        return;
      }

      if (mark === Mark.Regular) {
        transaction = transaction.removeMark(from, to, marks.strong);
        transaction = transaction.removeMark(from, to, marks.em);
      }

      if (mark === Mark.Bold) {
        transaction = transaction.removeMark(from, to, marks.em);
        transaction = transaction.addMark(from, to, marks.strong.create());
      }

      if (mark === Mark.Italic) {
        transaction = transaction.removeMark(from, to, marks.strong);
        transaction = transaction.addMark(from, to, marks.em.create());
      }

      if (mark === Mark.BoldItalic) {
        transaction = transaction.addMark(from, to, marks.strong.create());
        transaction = transaction.addMark(from, to, marks.em.create());
      }

      if (transaction.docChanged) {
        editorView.dispatch(transaction);
      }

      setCurrentMark(mark);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editorView, currentMark]
  );

  return (
    <DropdownMenu
      onOpenChange={() => {
        editorView?.focus();
      }}
    >
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button
          className={cn(
            "border-muted-foreground/30 disabled:hover:bg-muted-foreground/30 hover:bg-muted-foreground/30 text-primary h-5 w-24 select-none justify-between rounded-sm border bg-transparent px-1 py-0 text-left text-xs transition-none hover:border-transparent",
            disabled && "opacity-40"
          )}
        >
          {currentMark}
          <Icons.chevronUpDown size={10} strokeWidth={3} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-28 min-w-0">
        <DropdownMenuRadioGroup
          value={currentMark}
          onValueChange={(value) => {
            applyMark(value as Mark);
          }}
        >
          <div className="[&>*]:py-0.5 [&>*]:pl-1.5 [&>*]:pr-2">
            <DropdownMenuRadioItem value={Mark.Regular}>
              {Mark.Regular}
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem value={Mark.Bold} className="font-bold">
              {Mark.Bold}
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem value={Mark.Italic} className="italic">
              {Mark.Italic}
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem
              value={Mark.BoldItalic}
              className="font-bold italic"
            >
              {Mark.BoldItalic}
            </DropdownMenuRadioItem>
          </div>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
