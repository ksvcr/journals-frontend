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
    view
  ) => {
    if (dispatch) {
      const { selection, schema } = state;
      let { tr } = state;
      const inputs = {
        rows: 3,
        cols: 3
      };
      if (inputs) {
        const { rows, cols } = inputs;
        tr = tr.setSelection(selection);
        tr = insertTable(tr, schema, rows, cols);
      }
      dispatch(tr);
    }
    return false;
  };
}

export default TableInsertCommand;
