import { redo } from 'prosemirror-history';

import UICommand from '../UICommand';

class HistoryRedoCommand extends UICommand {
  execute = (
    state,
    dispatch,
    view
  ) => {
    return redo(state, dispatch);
  };
}

export default HistoryRedoCommand;
