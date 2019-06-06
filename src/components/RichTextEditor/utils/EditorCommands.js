import * as ProsemirrorTables from 'prosemirror-tables';

import MarkToggleCommand from './commands/MarkToggleCommand'
import HeadingCommand from './commands/HeadingCommand';
import HistoryRedoCommand from './commands/HistoryRedoCommand';
import HistoryUndoCommand from './commands/HistoryUndoCommand';
import TextAlignCommand from './commands/TextAlignCommand';
import TextColorCommand from './commands/TextColorCommand';
import TextHighlightCommand from './commands/TextHighlightCommand';
import LinkSetURLCommand from './commands/LinkSetURLCommand';
import LinkRemoveCommand from './commands/LinkRemoveCommand';
import ImageListCommand from './commands/ImageListCommand';
import TableInsertCommand from './commands/TableInsertCommand';
import TableMergeCellsCommand from './commands/TableMergeCellsCommand';
import TableEditMetaCommand from './commands/TableEditMetaCommand';
import createCommand from '../utils/createCommand';

export const H1 = new HeadingCommand(1);
export const H2 = new HeadingCommand(2);
export const H3 = new HeadingCommand(3);
export const H4 = new HeadingCommand(4);

export const HISTORY_REDO = new HistoryRedoCommand();
export const HISTORY_UNDO = new HistoryUndoCommand();

export const STRONG = new MarkToggleCommand('strong');
export const EM = new MarkToggleCommand('em');
export const UNDERLINE = new MarkToggleCommand('underline');
export const STRIKE = new MarkToggleCommand('strike');
export const UPPERCASE = new MarkToggleCommand('uppercase');
export const CAPITALIZE = new MarkToggleCommand('capitalize');
export const TEXT_ALIGN_CENTER = new TextAlignCommand('center');
export const TEXT_ALIGN_JUSTIFY = new TextAlignCommand('justify');
export const TEXT_ALIGN_LEFT = new TextAlignCommand('left');
export const TEXT_ALIGN_RIGHT = new TextAlignCommand('right');
export const TEXT_COLOR = new TextColorCommand();
export const TEXT_HIGHLIGHT = new TextHighlightCommand();
export const LINK_SET_URL = new LinkSetURLCommand();
export const LINK_REMOVE = new LinkRemoveCommand();
export const IMAGE_LIST = new ImageListCommand();

const {
  addColumnAfter,
  addColumnBefore,
  addRowAfter,
  addRowBefore,
  deleteColumn,
  deleteRow,
  deleteTable,
  splitCell
} = ProsemirrorTables;

export const TABLE_INSERT_TABLE = new TableInsertCommand();
export const TABLE_MERGE_CELLS = new TableMergeCellsCommand();
export const TABLE_ADD_COLUMN_AFTER = createCommand(addColumnAfter);
export const TABLE_ADD_COLUMN_BEFORE = createCommand(addColumnBefore);
export const TABLE_ADD_ROW_AFTER = createCommand(addRowAfter);
export const TABLE_ADD_ROW_BEFORE = createCommand(addRowBefore);
export const TABLE_DELETE_COLUMN = createCommand(deleteColumn);
export const TABLE_DELETE_ROW = createCommand(deleteRow);
export const TABLE_DELETE_TABLE = createCommand(deleteTable);
export const TABLE_SPLIT_ROW = createCommand(splitCell);
export const TABLE_EDIT_META = new TableEditMetaCommand();
