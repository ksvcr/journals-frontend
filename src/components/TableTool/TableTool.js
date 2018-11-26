import React, { Component } from 'react';
import { genKey } from 'draft-js';
import Icon from '~/components/Icon/Icon';

import { addNewBlockAt } from '~/services/customDraftUtils';

import './table-tool.scss';
import './assets/table.svg';

const entityData =  {
  rows: [
    [
      {
        entityMap: {},
        blocks: [
          {
            key: genKey(),
            text: ' ',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: []
          }
        ]
      },
      {
        entityMap: {},
        blocks: [
          {
            key: genKey(),
            text: ' ',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: []
          }
        ]
      }
    ]
  ],
  numberOfColumns: 2
};

class TableTool extends Component {
  handleBlockAdd = () => {
    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();
    const blockKey = 'block-table';
    const selection = editorState.getSelection();
    setEditorState(addNewBlockAt(
      editorState,
      selection.getAnchorKey(),
      blockKey,
      entityData
    ))
  };

  render() {
    return (
      <button type="button" className="table-tool editor-button" onClick={ this.handleBlockAdd }>
        Добавить таблицу
        <Icon name="table" className="table-tool__icon editor-button__icon" />
      </button>
    );
  }
}

export default TableTool;
