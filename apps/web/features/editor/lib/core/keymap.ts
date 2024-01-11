import { toggleMark } from "prosemirror-commands";
import { redo, undo } from "prosemirror-history";
import { type Schema } from "prosemirror-model";

import { isMac } from "~/shared";

export const buildKeyMap = (schema: Schema) => {
  let keyMap = {
    "Mod-z": undo,
    "Shift-Mod-z": redo,
    ...(isMac ? {} : { "Mod-y": redo }),
  };

  if (schema.marks.strong) {
    keyMap = {
      ...keyMap,
      ...{
        "Mod-b": toggleMark(schema.marks.strong),
        "Mod-B": toggleMark(schema.marks.strong),
      },
    };
  }

  if (schema.marks.em) {
    keyMap = {
      ...keyMap,
      ...{
        "Mod-i": toggleMark(schema.marks.em),
        "Mod-I": toggleMark(schema.marks.em),
      },
    };
  }

  if (schema.marks.underline) {
    keyMap = {
      ...keyMap,
      ...{
        "Mod-u": toggleMark(schema.marks.underline),
        "Mod-U": toggleMark(schema.marks.underline),
      },
    };
  }

  if (schema.marks.strikethrough) {
    keyMap = {
      ...keyMap,
      ...{
        "Mod-Shift-x": toggleMark(schema.marks.strikethrough),
        "Mod-Shift-X": toggleMark(schema.marks.strikethrough),
      },
    };
  }

  return keyMap;
};
