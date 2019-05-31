import HeadingCommand from './commands/HeadingCommand';
import HistoryRedoCommand from './commands/HistoryRedoCommand';
import HistoryUndoCommand from './commands/HistoryUndoCommand';

export const H1 = new HeadingCommand(1);
export const H2 = new HeadingCommand(2);
export const H3 = new HeadingCommand(3);
export const H4 = new HeadingCommand(4);

export const HISTORY_REDO = new HistoryRedoCommand();
export const HISTORY_UNDO = new HistoryUndoCommand();
