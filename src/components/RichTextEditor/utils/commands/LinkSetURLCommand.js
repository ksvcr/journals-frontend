import { TextSelection } from 'prosemirror-state';

import applyMark from '../applyMark';
import findNodesWithSameMark from '../findNodesWithSameMark';
import UICommand from '../UICommand';

class LinkSetURLCommand extends UICommand {
  isEnabled = (state) => {
    if (!(state.selection instanceof TextSelection)) {
      // Could be a NodeSelection or CellSelection.
      return false;
    }

    const markType = state.schema.marks['link'];
    if (!markType) {
      return false;
    }
    const { from, to } = state.selection;
    return from < to;
  };

  getHref = (
    state
  ) => {
    const { doc, schema, selection } = state;
    const markType = schema.marks['link'];
    const { from, to } = selection;
    const result = findNodesWithSameMark(doc, from, to, markType);
    return result ? result.mark.attrs.href : '';
  };

  execute = (
    state,
    dispatch,
    view,
    href
  ) => {
    if (dispatch) {
      const { selection, schema } = state;
      let { tr } = state;
      tr = tr.setSelection(selection);
      if (href !== undefined) {
        const markType = schema.marks['link'];
        const attrs = href ? { href } : null;
        tr = applyMark(
          tr.setSelection(state.selection),
          schema,
          markType,
          attrs
        );
      }
      dispatch(tr);
    }
    view && view.focus();
    return true;
  };
}

export default LinkSetURLCommand;
