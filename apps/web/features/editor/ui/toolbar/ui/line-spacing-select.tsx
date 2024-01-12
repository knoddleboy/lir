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

import { useEffect, useState } from "react";

import { documentModel } from "~/entities/document";
import { editorModel } from "~/entities/editor";
import { setLineSpacing } from "~/features/editor/lib/core/commands";
import {
  LineSpacings,
  type LineSpacing,
  defaultLineSpacing,
} from "~/features/editor/lib/core/constants";

const LineSpacingSelectInner = () => {
  const document = documentModel.useCurrentDocument();
  const editorSchema = editorModel.useEditorStore().schema;
  const editorView = editorModel.useEditorStore().view?.current;
  const editorState = editorModel.useEditorStore().state;

  const disabled = !document || !editorSchema || !editorView || !editorState;

  const [currentLineSpacing, setCurrentLineSpacing] =
    useState<LineSpacing>(defaultLineSpacing);

  const getSelectionLineSpacing = () => {
    if (!editorState) return defaultLineSpacing;

    const { from, to } = editorState.selection;
    let selectionLineSpacing: LineSpacing = defaultLineSpacing;

    editorState.doc.nodesBetween(from, to, (node) => {
      if (["heading", "paragraph"].includes(node.type.name)) {
        if (node.attrs.lineSpacing) {
          selectionLineSpacing = node.attrs.lineSpacing;
        }
      }
    });

    return selectionLineSpacing;
  };

  useEffect(() => {
    setCurrentLineSpacing(getSelectionLineSpacing());
  }, [editorState]);

  const applyLineSpacing = (lineSpacing: LineSpacing) => {
    if (!editorView) return;

    // Keep selection.
    editorView.focus();

    const { state, dispatch } = editorView;
    if (setLineSpacing(lineSpacing)(state, dispatch)) {
      setCurrentLineSpacing(lineSpacing);
    }
  };

  return (
    <DropdownMenu
      onOpenChange={() => {
        editorView.focus();
      }}
    >
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button
          className={cn(
            "border-muted-foreground/30 disabled:hover:bg-muted-foreground/30 hover:bg-muted-foreground/30 text-primary h-5 w-12 select-none justify-between rounded-sm border bg-transparent px-1 py-0 text-left text-xs transition-none hover:border-transparent",
            disabled && "opacity-40"
          )}
        >
          {currentLineSpacing.toFixed(1)}
          <Icons.chevronUpDown size={10} strokeWidth={3} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-20 min-w-0">
        <DropdownMenuRadioGroup
          value={currentLineSpacing.toString()}
          onValueChange={(value) => {
            applyLineSpacing(+value as LineSpacing);
          }}
          className="font-medium [&>*]:py-0.5 [&>*]:pl-1.5 [&>*]:pr-2"
        >
          {LineSpacings.map((spacing) => (
            <DropdownMenuRadioItem key={spacing} value={spacing.toString()}>
              {spacing.toFixed(1)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const LineSpacingSelect = () => (
  <div className="flex items-center">
    <Icons.moveVertical
      size={14}
      strokeWidth={2}
      className="text-accent-foreground opacity-60"
    />
    <LineSpacingSelectInner />
  </div>
);
