import { cn } from "@lir/lib";
import { Button, Icons } from "@lir/ui";

import { documentModel } from "~/entities/document";
import { editorModel, setAlignment, type Alignment } from "~/entities/editor";

export const AlignmentFormats = () => {
  const document = documentModel.useCurrentDocument();
  const editorSchema = editorModel.useEditorStore().schema;
  const editorView = editorModel.useEditorStore().view?.current;
  const editorState = editorModel.useEditorStore().state;

  const disabled = !document || !editorSchema || !editorView || !editorState;

  const applyAlignment = (alignment: Alignment) => {
    if (!editorView) return;

    // Keep selection.
    editorView.focus();

    const { state, dispatch } = editorView;
    setAlignment(alignment)(state, dispatch);
  };

  const getCurrentAlignment = () => {
    if (!editorState) return;

    const { from, to } = editorState.selection;
    let alignment: Alignment = "left";

    editorState.doc.nodesBetween(from, to, (node) => {
      if (["heading", "paragraph"].includes(node.type.name)) {
        if (node.attrs.align) {
          alignment = node.attrs.align;
        }
      }
    });

    return alignment as Alignment;
  };

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
