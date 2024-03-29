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

import { useCallback, useEffect, useState } from "react";

import { documentModel } from "~/entities/document";
import {
  editorModel,
  setFontSize,
  FontSizes,
  defaultFontSize,
  type FontSize,
} from "~/entities/editor";

export const FontSizeSelect = () => {
  const document = documentModel.useCurrentDocument();
  const editorView = editorModel.useEditorStore((state) => state.view?.current);
  const editorState = editorModel.useEditorStore((state) => state.state);
  const disabled = !document || !editorView || !editorState;

  const [currentFontSize, setCurrentFontSize] = useState<FontSize>(defaultFontSize);

  useEffect(() => {
    const getSelectionFontSize = (): FontSize => {
      if (disabled) return defaultFontSize;

      const { from, to } = editorState.selection;
      let selectionFontSize: FontSize = defaultFontSize;

      editorState.doc.nodesBetween(from, to, (node) => {
        if (!node.isInline) return;

        node.marks.forEach((mark) => {
          if (mark.type.name === "fontSize") {
            selectionFontSize = mark.attrs.size;
          }
        });
      });

      return selectionFontSize;
    };

    setCurrentFontSize(getSelectionFontSize());
  }, [disabled, editorState]);

  const applyFontSize = useCallback(
    (size: FontSize) => {
      if (disabled) return currentFontSize;

      // Keep selection.
      editorView.focus();

      const { state, dispatch } = editorView;
      if (setFontSize(size)(state, dispatch)) {
        setCurrentFontSize(size);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editorView, currentFontSize]
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
            "border-muted-foreground/30 disabled:hover:bg-muted-foreground/30 hover:bg-muted-foreground/30 text-primary h-5 w-14 select-none justify-between rounded-sm border bg-transparent px-1 py-0 text-left text-xs transition-none hover:border-transparent",
            disabled && "opacity-40"
          )}
        >
          {currentFontSize}
          <Icons.chevronUpDown size={10} strokeWidth={3} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-24 min-w-0">
        <DropdownMenuRadioGroup
          value={currentFontSize.toString()}
          onValueChange={(value) => {
            applyFontSize(+value as FontSize);
          }}
          className="font-medium [&>*]:py-0.5 [&>*]:pl-1.5 [&>*]:pr-2"
        >
          {FontSizes.map((size) => (
            <DropdownMenuRadioItem key={size} value={size.toString()}>
              {size}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
