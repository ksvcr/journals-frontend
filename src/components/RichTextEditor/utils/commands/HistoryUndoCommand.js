import { undo } from 'prosemirror-history';

import UICommand from '../UICommand';

class HistoryUndoCommand extends UICommand {
  execute = (
    state,
    dispatch,
    view
  ) => {
    return undo(state, dispatch);
  };
}

export default HistoryUndoCommand;
