import { TextSelection } from 'prosemirror-state';

import insertTable from '../insertTable';
import UICommand from '../UICommand';

class TableInsertCommand extends UICommand {
  isEnabled = (state) => {
    const { selection } = state;
    if (selection instanceof TextSelection) {
      return selection.from === selection.to;
    }
    return false;
  };

  execute = (
    state,
    dispatch,
    view,
    inputs
  ) => {
    if (dispatch) {
      const { selection, schema } = state;
      let { tr } = state;
      if (inputs) {
        const { rows=2, cols=3, ...meta } = inputs;
        tr = tr.setSelection(selection);
        tr = insertTable(tr, schema, rows, cols, meta);
      }
      dispatch(tr);
    }
    return false;
  };
}

export default TableInsertCommand;
