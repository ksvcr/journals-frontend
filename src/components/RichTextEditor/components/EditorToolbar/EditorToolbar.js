import React, { Component } from 'react';
import CommandButton from '../CommandButton/CommandButton';
import * as EditorCommands from '../../utils/EditorCommands';
import FontSizeTool from '../FontSizeTool/FontSizeTool';
import AddLinkTool from '../AddLinkTool/AddLinkTool';
import HighlightTool from '../HighlightTool/HighlightTool';
import ColorTool from '../ColorTool/ColorTool';
import TableTool from '../TableTool/TableTool';
import TableEditMetaTool from '../TableEditMetaTool/TableEditMetaTool';
import ExpandTool from '../ExpandTool/ExpandTool';

import './editor-toolbar.scss'

const {
  H1, H2, H3, H4,
  HISTORY_REDO, HISTORY_UNDO,
  STRONG, EM, UNDERLINE, STRIKE, CAPITALIZE, UPPERCASE,
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
    command: TABLE_ADD_ROW_BEFORE,
    icon: 'add-row-before'
  },
  {
    command: TABLE_ADD_ROW_AFTER,
    icon: 'add-row-after'
  },
  {
    command: TABLE_DELETE_ROW,
    icon: 'delete-row'
  },
  {
    command: TABLE_ADD_COLUMN_BEFORE,
    icon: 'add-column-before'
  },
  {
    command: TABLE_ADD_COLUMN_AFTER,
    icon: 'add-column-after'
  },
  {
    command: TABLE_DELETE_COLUMN,
    icon: 'delete-row'
  },
  {
    command: TABLE_MERGE_CELLS,
    icon: 'merge'
  },
  {
    command: TABLE_SPLIT_ROW,
    icon: 'split'
  },
  {
    command: TABLE_DELETE_TABLE,
    icon: 'delete-table'
  },
];


class EditorToolbar extends Component {
  state = {
    isExpanded: false
  };

  handleExpand = () => {
    this.setState(({ isExpanded }) => ({
      isExpanded: !isExpanded
    }));
  };

  get defaultButtonProps() {
    const { editorState, editorView, dispatchTransaction } = this.props;
    return {
      dispatch: dispatchTransaction,
      editorState: editorState,
      editorView: editorView
    };
  }


  renderHeadings = () => {
    const headings = [
      { command: H1, title: 'H1' },
      { command: H2, title: 'H2' },
      { command: H3, title: 'H3' },
      { command: H4, title: 'H4' },
    ];

    return headings.map(item => (
      <CommandButton
        key={ item.title }
        command={ item.command }
        title={ item.title }
        { ...this.defaultButtonProps }
      />
    ));
  };

  renderTableToolbar = () => {
    return TABLE_COMMANDS_GROUP.map((item, index) => (
      <CommandButton
        key={ index }
        command={ item.command }
        icon={ item.icon }
        { ...this.defaultButtonProps }
      />
    ))
  };

  render() {
    const { isExpanded } = this.state;
    return (
      <div className="editor-toolbar">
        <div className="editor-toolbar__row">
          <FontSizeTool { ...this.defaultButtonProps } />

          <div className="editor-toolbar__separator" />

          { this.renderHeadings() }

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

          <div className="editor-toolbar__separator" />

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

          <ExpandTool isActive={ isExpanded } onClick={ this.handleExpand } />
        </div>

        { isExpanded &&
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

            <div className="editor-toolbar__separator" />

            <CommandButton
              command={ CAPITALIZE }
              icon="capitalize"
              { ...this.defaultButtonProps }
            />

            <CommandButton
              command={ UPPERCASE }
              icon="uppercase"
              { ...this.defaultButtonProps }
            />

            <div className="editor-toolbar__separator" />

            <TableTool { ...this.defaultButtonProps } />

            { this.renderTableToolbar() }

            <TableEditMetaTool { ...this.defaultButtonProps } />
          </div>
        }
      </div>
    );
  }
}

export default EditorToolbar;
