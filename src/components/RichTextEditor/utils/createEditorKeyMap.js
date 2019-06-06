import * as EditorCommands from './EditorCommands';
import * as EditorKeyMap from './EditorKeyMap';

const {
  KEY_REDO,
  KEY_TAB_SHIFT,
  KEY_TAB,
  KEY_TOGGLE_BOLD,
  KEY_TOGGLE_ITALIC,
  KEY_UNDO,
  KEY_TOGGLE_HEADING_1
} = EditorKeyMap;

const {
  EM,
  HISTORY_REDO,
  HISTORY_UNDO,
  TABLE_MOVE_TO_NEXT_CELL,
  TABLE_MOVE_TO_PREV_CELL,
  STRONG,
  H1
} = EditorCommands;

function bindCommands(...commands) {
  return function(
    state,
    dispatch,
    view
  ) {
    return commands.some(cmd => {
      if (cmd.isEnabled(state, view)) {
        cmd.execute(state, dispatch, view);
        return true;
      }
      return false;
    });
  };
}

export default function createEditorKeyMap() {
  const result = {
    [KEY_REDO.common]: HISTORY_REDO.execute,
    [KEY_TAB.common]: bindCommands(
      TABLE_MOVE_TO_NEXT_CELL
    ),
    [KEY_TAB_SHIFT.common]: bindCommands(
      TABLE_MOVE_TO_PREV_CELL
    ),
    [KEY_TOGGLE_BOLD.common]: STRONG.execute,
    [KEY_TOGGLE_ITALIC.common]: EM.execute,
    [KEY_UNDO.common]: HISTORY_UNDO.execute
  };

  return result;
}
