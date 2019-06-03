import { TextSelection } from 'prosemirror-state';

import applyMark from '../applyMark';
import UICommand from '../UICommand';

class LinkRemoveCommand extends UICommand {
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

  execute = (
    state,
    dispatch,
    view
  ) => {
    if (dispatch) {
      const { selection, schema } = state;
      let { tr } = state;
      tr = tr.setSelection(selection);
      const markType = schema.marks['link'];
      const attrs = null;
      tr = applyMark(
        tr.setSelection(state.selection),
        schema,
        markType,
        attrs
      );
      dispatch(tr);
    }
    view && view.focus();
    return true;
  };
}

export default LinkRemoveCommand;
