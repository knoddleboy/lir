import { cn } from "@lir/lib";
import { Button, Icons } from "@lir/ui";

import { useCallback } from "react";

import { documentModel } from "~/entities/document";
import { editorModel, setAlignment, type Alignment } from "~/entities/editor";

export const AlignmentFormats = () => {
  const document = documentModel.useCurrentDocument();
  const editorView = editorModel.useEditorStore().view?.current;
  const disabled = !document || !editorView;

  const applyAlignment = useCallback(
    (alignment: Alignment) => {
      if (disabled) return;

      // Keep selection.
      editorView.focus();

      const { state, dispatch } = editorView;
      setAlignment(alignment)(state, dispatch);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editorView]
  );

  const getCurrentAlignment = useCallback(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorView]);

  const isLeftAligned = getCurrentAlignment() === "left";
  const isCenterAligned = getCurrentAlignment() === "center";
  const isRightAligned = getCurrentAlignment() === "right";
  const isJustifyAligned = getCurrentAlignment() === "justify";

  return (
    <div className={cn("flex items-center gap-0.5", disabled && "opacity-40")}>
      <Button
        variant="control-ghost"
        className={cn(
          "disabled:active:bg-control disabled:active:text-accent-foreground/60 h-[22px] w-6 rounded-sm p-0",
          isLeftAligned &&
            "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground"
        )}
        onClick={() => {
          applyAlignment("left");
        }}
        disabled={disabled}
      >
        <Icons.alignLeft size={16} />
      </Button>

      <Button
        variant="control-ghost"
        className={cn(
          "disabled:active:bg-control disabled:active:text-accent-foreground/60 h-[22px] w-6 rounded-sm p-0",
          isCenterAligned &&
            "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground"
        )}
        onClick={() => {
          applyAlignment("center");
        }}
        disabled={disabled}
      >
        <Icons.alignCenter size={16} />
      </Button>

      <Button
        variant="control-ghost"
        className={cn(
          "disabled:active:bg-control disabled:active:text-accent-foreground/60 h-[22px] w-6 rounded-sm p-0",
          isRightAligned &&
            "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground"
        )}
        onClick={() => {
          applyAlignment("right");
        }}
        disabled={disabled}
      >
        <Icons.alignRight size={16} />
      </Button>

      <Button
        variant="control-ghost"
        className={cn(
          "disabled:active:bg-control disabled:active:text-accent-foreground/60 h-[22px] w-6 rounded-sm p-0",
          isJustifyAligned &&
            "bg-control-foreground text-accent-foreground hover:bg-control-foreground hover:text-accent-foreground"
        )}
        onClick={() => {
          applyAlignment("justify");
        }}
        disabled={disabled}
      >
        <Icons.alignJustify size={16} />
      </Button>
    </div>
  );
};
