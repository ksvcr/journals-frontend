import { toggleMark } from 'prosemirror-commands';
import { TextSelection } from 'prosemirror-state';
import { hasParentNode } from 'prosemirror-utils';


import findNodesWithSameMark from '../findNodesWithSameMark';
import UICommand from '../UICommand';

class MarkToggleCommand extends UICommand {
  constructor(markName) {
    super();
    this._markName = markName;
  }

  isActive = (state) => {
    const { schema, doc, selection } = state;
    const { from, to } = selection;
    const markType = schema.marks[this._markName];
    if (markType && from < to) {
      return !!findNodesWithSameMark(doc, from, to - 1, markType);
    }
    return false;
  };

  execute = (
    state,
    dispatch,
    view
  ) => {
    const { schema, selection, tr } = state;
    const markType = schema.marks[this._markName];
    if (!markType) {
      return false;
    }

    if (selection.empty && !(selection instanceof TextSelection)) {
      return false;
    }

    const { from, to } = selection;
    if (tr && to === from + 1) {
      const node = tr.doc.nodeAt(from);
      if (node.isAtom && !node.isText && node.isLeaf) {
        // An atomic node (e.g. Image) is selected.
        return false;
      }
    }

    const hasCodeBlock = hasParentNode(node => node.type === state.schema.nodes['code_block'])(selection);

    if (hasCodeBlock) {
      return false;
    }

    // TODO: Replace `toggleMark` with transform that does not change scroll
    // position.
    return toggleMark(markType)(state, dispatch, view);
  };
}

export default MarkToggleCommand;
