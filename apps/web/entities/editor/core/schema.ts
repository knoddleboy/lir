import {
  type Node,
  type Mark,
  type NodeSpec,
  type MarkSpec,
  type DOMOutputSpec,
  Schema,
} from "prosemirror-model";

import { defaultFontSize } from "./constants";

const pDOM = (node: Node): DOMOutputSpec => {
  return [
    "p",
    {
      style: `text-align: ${node.attrs.align}; line-height: ${node.attrs.lineSpacing};`,
    },
    0,
  ];
};
const hDOM = (node: Node): DOMOutputSpec => {
  let classes = "";

  switch (node.attrs.level) {
    case 1:
      classes += "mb-1 mt-8 ";
      break;
    case 2:
      classes += "mt-6 ";
      break;
    case 3:
      classes += "mt-4 ";
      break;
  }

  return [
    `h${node.attrs.level}`,
    {
      style: `text-align: ${node.attrs.align}; line-height: ${node.attrs.lineSpacing};`,
      class: classes.trim(),
    },
    0,
  ];
};
const hrDOM: DOMOutputSpec = ["hr"];
const brDOM: DOMOutputSpec = ["br"];

export const nodes = {
  // The top level document node.
  doc: {
    content: "block+",
  } as NodeSpec,

  // A plain paragraph textblock. Represented in the DOM as a `<p>` element.
  paragraph: {
    attrs: {
      align: { default: "left" },
      lineSpacing: { default: 1.2 },
    },
    content: "inline*",
    group: "block",
    parseDOM: [{ tag: "p" }],
    toDOM: pDOM,
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
    attrs: {
      level: { default: 1 },
      align: { default: "left" },
      lineSpacing: { default: 1.2 },
    },
    content: "inline*",
    group: "block",
    defining: true,
    parseDOM: [
      { tag: "h1", attrs: { level: 1 } },
      { tag: "h2", attrs: { level: 2 } },
      { tag: "h3", attrs: { level: 3 } },
    ],
    toDOM: hDOM,
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

const emDOM: DOMOutputSpec = ["em", 0];
const strongDOM: DOMOutputSpec = ["strong", 0];
const underlineDOM: DOMOutputSpec = ["u", 0];
const strikethroughDOM: DOMOutputSpec = ["s", 0];
const fontSizeDOM = (mark: Mark): DOMOutputSpec => {
  return ["span", { style: `font-size: ${mark.attrs.size}px` }, 0];
};

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

  // A fontSize mark. Rendered as `<span>`, parse rules also match `font-size`.
  fontSize: {
    attrs: { size: { default: defaultFontSize } },
    parseDOM: [{ style: "font-size", getAttrs: (value) => ({ size: value }) }],
    toDOM: fontSizeDOM,
  } as MarkSpec,
};

export type SchemaNodes = keyof typeof nodes;
export type SchemaMarks = keyof typeof marks;

export default new Schema({ nodes, marks });
