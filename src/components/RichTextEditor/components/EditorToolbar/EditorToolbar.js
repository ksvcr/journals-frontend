import React, { Component } from 'react';
import CommandButton from '../CommandButton/CommandButton';
import * as EditorCommands from '../../utils/EditorCommands';
import FontSizeTool from '../FontSizeTool/FontSizeTool';
import AddLinkTool from '../AddLinkTool/AddLinkTool';
import HighlightTool from '../HighlightTool/HighlightTool';
import ColorTool from '../ColorTool/ColorTool';
import TableTool from '../TableTool/TableTool';

import './editor-toolbar.scss'
import { Separator } from 'draft-js-static-toolbar-plugin';
import { TABLE_EDIT_META } from '../../utils/EditorCommands';

const {
  H1, H2, H3, H4,
  HISTORY_REDO, HISTORY_UNDO,
  STRONG, EM, UNDERLINE, STRIKE,
  TEXT_ALIGN_CENTER, TEXT_ALIGN_JUSTIFY, TEXT_ALIGN_LEFT, TEXT_ALIGN_RIGHT,
  LINK_REMOVE, IMAGE_LIST,
  TABLE_ADD_COLUMN_AFTER,
  TABLE_ADD_COLUMN_BEFORE,
  TABLE_ADD_ROW_AFTER,
  TABLE_ADD_ROW_BEFORE,
  TABLE_DELETE_COLUMN,
  TABLE_DELETE_ROW,
  TABLE_DELETE_TABLE,
  TABLE_MERGE_CELLS,
  TABLE_SPLIT_ROW } = EditorCommands;


export const TABLE_COMMANDS_GROUP = [
  {
    'Col Before': TABLE_ADD_COLUMN_BEFORE,
    'Col After': TABLE_ADD_COLUMN_AFTER,
    'Del Col': TABLE_DELETE_COLUMN,
  },
  {
    'Row Before': TABLE_ADD_ROW_BEFORE,
    'Row After': TABLE_ADD_ROW_AFTER,
    'Del Row': TABLE_DELETE_ROW,
  },
  {
    'Merge': TABLE_MERGE_CELLS,
    'Split': TABLE_SPLIT_ROW,
  },
  {
    'Delete': TABLE_DELETE_TABLE,
  },
];


class EditorToolbar extends Component {
  get defaultButtonProps() {
    const { editorState, editorView, dispatchTransaction } = this.props;
    return {
      dispatch: dispatchTransaction,
      editorState: editorState,
      editorView: editorView
    };
  }

  renderTableToolbar = () => {
    const children = [];
    TABLE_COMMANDS_GROUP.forEach(group => {
      Object.keys(group).forEach(label => {
        const command = group[label];
        children.push(
          <CommandButton
            key={ label }
            command={ command }
            title={ label }
            { ...this.defaultButtonProps }
          />
        );
      });
    });

    return children;
  };

  render() {
    return (
      <div className="editor-toolbar">
        <div className="editor-toolbar__row">
          <FontSizeTool { ...this.defaultButtonProps } />

          <Separator className="editor-toolbar__separator" />

          <CommandButton
            command={ H1 }
            title="H1"
            { ...this.defaultButtonProps }
          />
          <CommandButton
            command={ H2 }
            title="H2"
            { ...this.defaultButtonProps }
          />
          <CommandButton
            command={ H3 }
            title="H3"
            { ...this.defaultButtonProps }
          />
          <CommandButton
            command={ H4 }
            title="H4"
            { ...this.defaultButtonProps }
          />

          <CommandButton
            command={ STRONG }
            icon="bold"
            { ...this.defaultButtonProps }
          />

          <CommandButton
            command={ EM }
            icon="italic"
            { ...this.defaultButtonProps }
          />

          <CommandButton
            command={ UNDERLINE }
            icon="underline"
            { ...this.defaultButtonProps }
          />

          <CommandButton
            command={ STRIKE }
            icon="strikethrough"
            { ...this.defaultButtonProps }
          />

          <Separator className="editor-toolbar__separator" />

          <CommandButton
            command={ TEXT_ALIGN_LEFT }
            icon="align-left"
            { ...this.defaultButtonProps }
          />

          <CommandButton
            command={ TEXT_ALIGN_CENTER }
            icon="align-center"
            { ...this.defaultButtonProps }
          />


          <CommandButton
            command={ TEXT_ALIGN_RIGHT }
            icon="align-right"
            { ...this.defaultButtonProps }
          />

          <CommandButton
            command={ TEXT_ALIGN_JUSTIFY }
            icon="align-justify"
            { ...this.defaultButtonProps }
          />

          <CommandButton
            command={ HISTORY_UNDO }
            icon="undo"
            { ...this.defaultButtonProps }
          />
          <CommandButton
            command={ HISTORY_REDO }
            icon="redo"
            { ...this.defaultButtonProps }
          />
        </div>


        <div className="editor-toolbar__row">
          <ColorTool { ...this.defaultButtonProps } />
          <HighlightTool { ...this.defaultButtonProps } />
          <AddLinkTool { ...this.defaultButtonProps } />
          <CommandButton
            command={ LINK_REMOVE }
            icon="unlink"
            { ...this.defaultButtonProps }
          />

          <CommandButton
            command={ IMAGE_LIST }
            icon="picture-small"
            { ...this.defaultButtonProps }
          />

          <Separator className="editor-toolbar__separator" />

          <TableTool { ...this.defaultButtonProps } />

          { this.renderTableToolbar() }

          <CommandButton
            command={ TABLE_EDIT_META }
            title="edit"
            { ...this.defaultButtonProps }
          />
        </div>
      </div>
    );
  }
}

export default EditorToolbar;
