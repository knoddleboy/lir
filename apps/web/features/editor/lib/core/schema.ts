import type { DOMOutputSpec, MarkSpec, NodeSpec } from "prosemirror-model";

const pDOM: DOMOutputSpec = ["p", 0],
  hrDOM: DOMOutputSpec = ["hr"],
  brDOM: DOMOutputSpec = ["br"];

export const nodes = {
  // The top level document node.
  doc: {
    content: "block+",
  } as NodeSpec,

  // A plain paragraph textblock. Represented in the DOM as a `<p>` element.
  paragraph: {
    content: "inline*",
    group: "block",
    parseDOM: [{ tag: "p" }],
    toDOM() {
      return pDOM;
    },
  } as NodeSpec,

  // A horizontal rule (`<hr>`).
  horizontal_rule: {
    group: "block",
    parseDOM: [{ tag: "hr" }],
    toDOM() {
      return hrDOM;
    },
  } as NodeSpec,

  // A heading textblock, with a `level` attribute that should hold the
  // number 1 to 3. Parsed and serialized as `<h1>` to `<h3>` elements.
  heading: {
    attrs: { level: { default: 1 } },
    content: "inline*",
    group: "block",
    defining: true,
    parseDOM: [
      { tag: "h1", attrs: { level: 1 } },
      { tag: "h2", attrs: { level: 2 } },
      { tag: "h3", attrs: { level: 3 } },
    ],
    toDOM(node) {
      return [`h${node.attrs.level}`, 0];
    },
  } as NodeSpec,

  // The text node.
  text: {
    group: "inline",
  } as NodeSpec,

  // A hard line break, represented in the DOM as `<br>`.
  hard_break: {
    inline: true,
    group: "inline",
    selectable: false,
    parseDOM: [{ tag: "br" }],
    toDOM() {
      return brDOM;
    },
  } as NodeSpec,
};

const emDOM: DOMOutputSpec = ["em", 0],
  strongDOM: DOMOutputSpec = ["strong", 0],
  underlineDOM: DOMOutputSpec = ["u", 0],
  strikethroughDOM: DOMOutputSpec = ["s", 0];

export const marks = {
  // An emphasis mark. Rendered as an `<em>` element. Has parse rules
  // that also match `<i>` and `font-style: italic`.
  em: {
    parseDOM: [
      { tag: "i" },
      { tag: "em" },
      { style: "font-style=italic" },
      { style: "font-style=normal", clearMark: (m) => m.type.name == "em" },
    ],
    toDOM() {
      return emDOM;
    },
  } as MarkSpec,

  // A strong mark. Rendered as `<strong>`, parse rules also match
  // `<b>` and `font-weight: bold`.
  strong: {
    parseDOM: [
      { tag: "strong" },
      // This works around a Google Docs misbehavior where
      // pasted content will be inexplicably wrapped in `<b>`
      // tags with a font-weight normal.
      {
        tag: "b",
        getAttrs: (node: HTMLElement) => node.style.fontWeight != "normal" && null,
      },
      { style: "font-weight=400", clearMark: (m) => m.type.name == "strong" },
      {
        style: "font-weight",
        getAttrs: (value: string) => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null,
      },
    ],
    toDOM() {
      return strongDOM;
    },
  } as MarkSpec,

  // A underline mark. Rendered as `<u>`, parse rules also match
  // `text-decoration: underline`.
  underline: {
    parseDOM: [
      { tag: "u" },
      { style: "text-decoration=underline" },
      {
        style: "text-decoration=none",
        clearMark: (m) => m.type.name == "underline",
      },
    ],
    toDOM() {
      return underlineDOM;
    },
  } as MarkSpec,

  // A strikethrough mark. Rendered as `<s>`, parse rules also match
  // `<strike>` and `text-decoration: line-through`.
  strikethrough: {
    parseDOM: [
      { tag: "s" },
      { tag: "strike" },
      { style: "text-decoration=line-through" },
      {
        style: "text-decoration=none",
        clearMark: (m) => m.type.name == "strikethrough",
      },
    ],
    toDOM() {
      return strikethroughDOM;
    },
  } as MarkSpec,
};
