import type { Attrs, NodeType } from "prosemirror-model";
import { type Command } from "prosemirror-state";

import type { Alignment, FontSize, LineSpacing } from "./constants";
import { getHeadingFontSize } from "./helpers";

export function setAlignment(alignment: Alignment): Command {
  return function (state, dispatch) {
    const { from, to } = state.selection;
    const { tr } = state;

    state.doc.nodesBetween(from, to, (node, pos) => {
      if (["heading", "paragraph"].includes(node.type.name)) {
        const newAttrs = { ...node.attrs, align: alignment };
        tr.setNodeMarkup(pos, undefined, newAttrs);
      }
    });

    if (dispatch) {
      dispatch(tr);
      return true;
    }

    return false;
  };
}

export function setLineSpacing(lineSpacing: LineSpacing): Command {
  return function (state, dispatch) {
    const { from, to } = state.selection;
    const { tr } = state;

    state.doc.nodesBetween(from, to, (node, pos) => {
      if (["heading", "paragraph"].includes(node.type.name)) {
        const newAttrs = { ...node.attrs, lineSpacing };
        tr.setNodeMarkup(pos, undefined, newAttrs);
      }
    });

    if (dispatch) {
      dispatch(tr);
      return true;
    }

    return false;
  };
}

export function setFontSize(fontSize: FontSize): Command {
  return function (state, dispatch) {
    const { from, to } = state.selection;
    const { tr } = state;

    if (dispatch) {
      dispatch(
        tr.addMark(from, to, state.schema.marks.fontSize.create({ size: fontSize }))
      );

      return true;
    }

    return false;
  };
}

export function setBlockType(blockType: NodeType, attrs?: Attrs): Command {
  return function (state, dispatch) {
    const { from, to } = state.selection;
    const { tr } = state;

    const isParagraph = blockType.name === "paragraph";
    const isHeading = blockType.name === "heading";
    const headingLevel = isHeading && attrs ? attrs.level : null;

    state.doc.nodesBetween(from, to, (node, pos) => {
      if (node.type.isBlock) {
        node.descendants((childNode, childPos) => {
          if (childNode.isText) {
            const childStartPos = pos + childPos;
            const childEndPos = pos + childPos + childNode.nodeSize + 1;
            const fontSizeMark = state.schema.marks.fontSize;
            const strongMark = state.schema.marks.strong;

            if (isParagraph) {
              tr.removeMark(childStartPos, childEndPos, strongMark);
              tr.addMark(childStartPos, childEndPos, fontSizeMark.create());
            }

            if (isHeading) {
              tr.addMark(childStartPos, childEndPos, strongMark.create());
              tr.addMark(
                childStartPos,
                childEndPos,
                fontSizeMark.create({ size: getHeadingFontSize(headingLevel) })
              );
            }
          }
        });

        tr.setNodeMarkup(pos, blockType, { ...node.attrs, ...attrs });
      }
    });

    if (dispatch) {
      dispatch(tr.scrollIntoView());

      return true;
    }

    return false;
  };
}
