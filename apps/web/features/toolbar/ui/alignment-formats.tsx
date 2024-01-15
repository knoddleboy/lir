import { cn } from "@lir/lib";
import { Button, Icons } from "@lir/ui";

import { createElement, useState, useEffect, useCallback } from "react";

import { documentModel } from "~/entities/document";
import { editorModel, setAlignment, type Alignment } from "~/entities/editor";

const alignmentIcons = {
  left: Icons.alignLeft,
  center: Icons.alignCenter,
  right: Icons.alignRight,
  justify: Icons.alignJustify,
};

export const AlignmentFormats = () => {
  const document = documentModel.useCurrentDocument();
  const editorView = editorModel.useEditorStore((state) => state.view?.current);
  const editorState = editorModel.useEditorStore((state) => state.state);
  const disabled = !document || !editorView;

  const [currentAlignment, setCurrentAlignment] = useState<Alignment>();

  useEffect(() => {
    const getCurrentAlignment = () => {
      if (disabled) return;

      const { state } = editorView;
      const { from, to } = state.selection;
      let alignment: Alignment = "left";

      state.doc.nodesBetween(from, to, (node) => {
        if (["heading", "paragraph"].includes(node.type.name)) {
          if (node.attrs.align) {
            alignment = node.attrs.align;
          }
        }
      });

      return alignment as Alignment;
    };

    setCurrentAlignment(getCurrentAlignment());
  }, [disabled, editorView, editorState]);

  const applyAlignment = useCallback(
    (alignment: Alignment) => {
      if (disabled) return;

      // Keep selection.
      editorView.focus();

      const { state, dispatch } = editorView;
      setAlignment(alignment)(state, dispatch);
      setCurrentAlignment(alignment);
    },
    [disabled, editorView]
  );

  return (
    <div className={cn("flex items-center gap-0.5", disabled && "opacity-40")}>
      {(["left", "center", "right", "justify"] as Alignment[]).map((alignment) => (
        <Button
          key={alignment}
          variant="control-ghost"
          className={cn(
            "disabled:active:bg-control disabled:active:text-accent-foreground/60 h-[22px] w-6 rounded-sm p-0",
            currentAlignment === alignment &&
              "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground"
          )}
          onClick={() => applyAlignment(alignment)}
          disabled={disabled}
        >
          {createElement(alignmentIcons[alignment], { size: 16 })}
        </Button>
      ))}
    </div>
  );
};
