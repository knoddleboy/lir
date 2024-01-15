import { cn } from "@lir/lib";
import {
  Icons,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@lir/ui";

import { type Attrs, type NodeType } from "prosemirror-model";
import { useCallback, useEffect, useState } from "react";

import { documentModel } from "~/entities/document";
import { editorModel, setBlockType, type SchemaNodes } from "~/entities/editor";

enum BlockType {
  Title = "Title",
  Heading1 = "Heading1",
  Heading2 = "Heading2",
  Paragraph = "No style",
}

export const BlockTypeSelect = () => {
  const document = documentModel.useCurrentDocument();
  const editorView = editorModel.useEditorStore((state) => state.view?.current);
  const editorState = editorModel.useEditorStore((state) => state.state);
  const disabled = !document || !editorView || !editorState;

  const [currentBlockType, setCurrentBlockType] = useState(BlockType.Paragraph);

  useEffect(() => {
    const getSelectionBlockType = () => {
      if (disabled) return BlockType.Paragraph;

      const { $from } = editorState.selection;
      let selectionBlock: {
        name: SchemaNodes;
        attrs: Attrs;
      } = {
        name: "paragraph",
        attrs: {},
      };

      for (let depth = $from.depth; depth > 0; depth--) {
        const node = $from.node(depth);
        if (node.isBlock) {
          selectionBlock = {
            name: node.type.name as SchemaNodes,
            attrs: node.attrs,
          };
        }
      }

      if (selectionBlock.name === "paragraph") {
        return BlockType.Paragraph;
      }

      if (selectionBlock.name === "heading") {
        switch (selectionBlock.attrs.level) {
          case 1:
            return BlockType.Title;
          case 2:
            return BlockType.Heading1;
          case 3:
            return BlockType.Heading2;
        }
      }

      return BlockType.Paragraph;
    };

    setCurrentBlockType(getSelectionBlockType());
  }, [disabled, editorState]);

  const applyBlockType = useCallback(
    (blockType: BlockType) => {
      if (disabled) return;

      // Keep selection.
      editorView.focus();

      const {
        state: { schema },
      } = editorView;
      let newBlockType: NodeType;
      let attrs: Attrs = {};

      switch (blockType) {
        case currentBlockType:
          return;

        case BlockType.Paragraph:
          newBlockType = schema.nodes.paragraph;
          break;

        case BlockType.Title:
          newBlockType = schema.nodes.heading;
          attrs = { level: 1 };
          break;

        case BlockType.Heading1:
          newBlockType = schema.nodes.heading;
          attrs = { level: 2 };
          break;

        case BlockType.Heading2:
          newBlockType = schema.nodes.heading;
          attrs = { level: 3 };
          break;

        default:
          newBlockType = schema.nodes.paragraph;
      }

      const { state, dispatch } = editorView;
      if (setBlockType(newBlockType, attrs)(state, dispatch)) {
        setCurrentBlockType(blockType);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editorView, currentBlockType]
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
            "border-muted-foreground/30 disabled:hover:bg-muted-foreground/30 hover:bg-muted-foreground/30 text-primary h-5 w-48 select-none justify-between rounded-sm border bg-transparent px-1 py-0 text-left text-xs transition-none hover:border-transparent",
            disabled && "opacity-40"
          )}
        >
          {currentBlockType}
          <Icons.chevronDown size={12} strokeWidth={3} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48">
        <DropdownMenuRadioGroup
          value={currentBlockType}
          onValueChange={(value) => {
            applyBlockType(value as BlockType);
          }}
        >
          <div className="[&>*]:py-0.5 [&>*]:pl-1.5 [&>*]:pr-2">
            <DropdownMenuRadioItem
              value={BlockType.Paragraph}
              className="text-accent-foreground text-xs"
            >
              {BlockType.Paragraph}
            </DropdownMenuRadioItem>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuLabel className="text-accent-foreground/40 select-none px-2 py-1 text-xs font-bold">
            Paragraph Styles
          </DropdownMenuLabel>

          <div className="[&>*]:py-0.5 [&>*]:pl-1.5 [&>*]:pr-2">
            <DropdownMenuRadioItem
              value={BlockType.Title}
              className="text-2xl font-bold"
            >
              {BlockType.Title}
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem
              value={BlockType.Heading1}
              className="text-lg font-bold"
            >
              {BlockType.Heading1}
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem
              value={BlockType.Heading2}
              className="text-base font-semibold"
            >
              {BlockType.Heading2}
            </DropdownMenuRadioItem>
          </div>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
