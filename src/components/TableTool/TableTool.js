import React, { Component } from 'react';
import { AtomicBlockUtils, EditorState } from 'draft-js';
import Icon from '~/components/Icon/Icon';

import { withNamespaces } from 'react-i18next';

import './table-tool.scss';
import './assets/table.svg';

class TableTool extends Component {
  handleBlockAdd = () => {
    const entityData =  {
      rows: [
        [
          {
            content: 'text1',
            colspan: 1,
            rowspan: 1
          },
          {
            content: 'text2',
            colspan: 1,
            rowspan: 1
          },
          {
            content: 'text3',
            colspan: 1,
            rowspan: 1
          }
        ]
      ],
      title: 'Заголовок таблицы'
    };

    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();
    const blockKey = 'block-table';

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      blockKey,
      'MUTABLE',
      entityData
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity }
    );

    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        blockKey
      )
    );

  };

  render() {
    const { t } =this.props;
    return (
      <button type="button" className="table-tool editor-button" onClick={ this.handleBlockAdd }>
        { t('add_table') }
        <Icon name="table" className="table-tool__icon editor-button__icon" />
      </button>
    );
  }
}

TableTool = withNamespaces()(TableTool);

export default TableTool;
