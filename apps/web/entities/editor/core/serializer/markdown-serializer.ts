import {
  MarkdownSerializer,
  defaultMarkdownSerializer,
  type MarkdownSerializerState,
} from "prosemirror-markdown";
import type { Node } from "prosemirror-model";

const serializeNodes = {
  ...defaultMarkdownSerializer.nodes,

  paragraph(
    state: MarkdownSerializerState,
    node: Node,
    parent: Node,
    index: number
  ) {
    state.renderInline(node);
    state.ensureNewLine();

    const nextNode = parent.maybeChild(index + 1);
    if (nextNode && nextNode.isBlock && nextNode.content.size === 0) {
      state.write("\n");
    }
  },

  heading(state: MarkdownSerializerState, node: Node) {
    state.write(state.repeat("#", node.attrs.level) + " ");
    state.renderInline(node);
    state.ensureNewLine();
  },

  horizontal_rule(state: MarkdownSerializerState) {
    state.write("---\n");
  },

  hard_break(state: MarkdownSerializerState) {
    state.write("\\\n");
  },
};

const serializeMarks = {
  ...defaultMarkdownSerializer.marks,

  em: { open: "*", close: "*", mixable: true, expelEnclosingWhitespace: true },

  strong: { open: "**", close: "**", mixable: true, expelEnclosingWhitespace: true },

  // Markdown doesn't have a standard underline, so ignore this mark
  underline: { open: "", close: "", ignore: true },

  strikethrough: {
    open: "~~",
    close: "~~",
    mixable: true,
    expelEnclosingWhitespace: true,
  },

  // Markdown doesn't have a standard for this, so ignore this mark
  fontSize: { open: "", close: "", ignore: true },
};

export const markdownSerializer = new MarkdownSerializer(
  serializeNodes,
  serializeMarks
);
