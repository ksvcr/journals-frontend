import { AllSelection, TextSelection } from 'prosemirror-state';

// Whether the command for apply specific text style mark is enabled.
export default function isTextStyleMarkCommandEnabled(
  state,
  markName
) {
  const { selection, schema, tr } = state;
  const markType = schema.marks[markName];
  if (!markType) {
    return false;
  }

  if (
    !(selection instanceof TextSelection || selection instanceof AllSelection)
  ) {
    // Could be a NodeSelection or CellSelection.
    return false;
  }

  const { from, to } = state.selection;

  if (to === from + 1) {
    const node = tr.doc.nodeAt(from);
    if (node.isAtom && !node.isText && node.isLeaf) {
      // An atomic node (e.g. Image) is selected.
      return false;
    }
  }

  return true;
}
