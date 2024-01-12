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
import { useEffect, useState } from "react";

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
  const editorSchema = editorModel.useEditorStore().schema;
  const editorView = editorModel.useEditorStore().view?.current;
  const editorState = editorModel.useEditorStore().state;

  const disabled = !document || !editorSchema || !editorView || !editorState;

  const [currentMark, setCurrentMark] = useState<Mark>(Mark.Regular);

  const applyMark = (mark: Mark) => {
    if (!editorView) return;

    // Keep selection.
    editorView.focus();

    const { state } = editorView;
    const { from, to } = state.selection;
    let transaction = state.tr;

    if (mark === currentMark) {
      return;
    }

    if (mark === Mark.Regular) {
      transaction = transaction.removeMark(from, to, editorSchema.marks.strong);
      transaction = transaction.removeMark(from, to, editorSchema.marks.em);
    }

    if (mark === Mark.Bold) {
      transaction = transaction.removeMark(from, to, editorSchema.marks.em);
      transaction = transaction.addMark(
        from,
        to,
        editorSchema.marks.strong.create()
      );
    }

    if (mark === Mark.Italic) {
      transaction = transaction.removeMark(from, to, editorSchema.marks.strong);
      transaction = transaction.addMark(from, to, editorSchema.marks.em.create());
    }

    if (mark === Mark.BoldItalic) {
      transaction = transaction.addMark(
        from,
        to,
        editorSchema.marks.strong.create()
      );
      transaction = transaction.addMark(from, to, editorSchema.marks.em.create());
    }

    if (transaction.docChanged) {
      editorView.dispatch(transaction);
    }

    setCurrentMark(mark);
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

  return (
    <DropdownMenu
      onOpenChange={() => {
        editorView.focus();
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
