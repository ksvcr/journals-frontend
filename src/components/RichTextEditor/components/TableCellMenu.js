import React from 'react';

import CommandMenuButton from './CommandMenuButton';
import * as EditorCommands from '../utils/EditorCommands';

const {
  TABLE_ADD_COLUMN_AFTER,
  TABLE_ADD_COLUMN_BEFORE,
  TABLE_ADD_ROW_AFTER,
  TABLE_ADD_ROW_BEFORE,
  TABLE_DELETE_COLUMN,
  TABLE_DELETE_ROW,
  TABLE_DELETE_TABLE,
  TABLE_INSERT_TABLE,
  TABLE_MERGE_CELLS,
  TABLE_SPLIT_ROW,
} = EditorCommands;

export const TABLE_COMMANDS_GROUP = [
  {
    'Insert Table...': TABLE_INSERT_TABLE,
  },
  {
    'Insert Column Before': TABLE_ADD_COLUMN_BEFORE,
    'Insert Column After': TABLE_ADD_COLUMN_AFTER,
    'Delete Column': TABLE_DELETE_COLUMN,
  },
  {
    'Insert Row Before': TABLE_ADD_ROW_BEFORE,
    'Insert Row After': TABLE_ADD_ROW_AFTER,
    'Delete Row': TABLE_DELETE_ROW,
  },
  {
    'Merge Cells': TABLE_MERGE_CELLS,
    'Split Row': TABLE_SPLIT_ROW,
  },
  {
    'Delete Table': TABLE_DELETE_TABLE,
  },
];

class TableCellMenu extends React.PureComponent {
  render() {
    const { editorState, editorView } = this.props;
    return (
      <CommandMenuButton
        commandGroups={ TABLE_COMMANDS_GROUP }
        dispatch={ editorView.dispatch }
        editorState={ editorState }
        editorView={ editorView }
        title="Edit"
      />
    );
  }
}

export default TableCellMenu;
