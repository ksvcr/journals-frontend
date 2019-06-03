import { findParentNodeOfType } from 'prosemirror-utils';

import findActiveMark from './findActiveMark';

// This should map to `--czi-content-font-size` at `czi-editor.css`.
const FONT_PT_SIZE_DEFAULT = 11;

// This should map to `czi-heading.css`.
const MAP_HEADING_LEVEL_TO_FONT_PT_SIZE = {
  '1': 20,
  '2': 18,
  '3': 16,
  '4': 14,
  '5': 11,
  '6': 11,
};

export default function findActiveFontSize(state) {
  const { schema, doc, selection, tr } = state;
  const markType = schema.marks['mark-font-size'];
  const heading = schema.nodes['heading'];
  const defaultSize = String(FONT_PT_SIZE_DEFAULT);
  if (!markType) {
    return defaultSize;
  }

  const { from, to, empty } = selection;
  if (empty) {
    const storedMarks =
      tr.storedMarks ||
      state.storedMarks ||
      (selection.$cursor &&
        selection.$cursor.marks &&
        selection.$cursor.marks()) ||
      [];
    const sm = storedMarks.find(m => m.type === markType);
    return sm ? String(sm.attrs.pt || defaultSize) : defaultSize;
  }

  const mark = markType ? findActiveMark(doc, from, to, markType) : null;
  if (mark) {
    return String(mark.attrs.pt);
  }
  if (!heading) {
    return defaultSize;
  }
  const result = findParentNodeOfType(heading)(state.selection);
  if (!result) {
    return defaultSize;
  }
  const level = String(result.node.attrs.level);
  return MAP_HEADING_LEVEL_TO_FONT_PT_SIZE[level] || defaultSize;
}
