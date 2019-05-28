import React, { Component } from 'react';
import { AtomicBlockUtils, EditorState } from 'draft-js';

import Icon from '~/components/Icon/Icon';
import ToolTip from '~/components/ToolTip/ToolTip';
import TableCreateForm from '~/components/TableCreateForm/TableCreateForm';

import { withNamespaces } from 'react-i18next';

import './table-tool.scss';
import './assets/table.svg';

class TableTool extends Component {
  state = {
    showForm: false
  };

  handleBlockAdd = (formData) => {
    const { row_count=1, col_count=3 , ...meta } = formData;
    const defaultCell = {
      content: ' ',
      colspan: 1,
      rowspan: 1
    };

    const rows = [];

    for (let i = 0; i < row_count; i++) {
      rows.push([]);

      for (let j = 0; j < col_count; j++) {
        rows[i].push({ ...defaultCell });
      }
    }
    
    const entityData =  {
      rows,
      title: 'Заголовок таблицы',
      ...meta
    };

    this.handleFormToggle();

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

  handleFormToggle = () => {
    this.setState(({ showForm }) => ({
      showForm: !showForm
    }));
  };

  render() {
    const { t } = this.props;
    const { showForm } = this.state;
    return (
      <ToolTip
        className="tooltip"
        position="bottom-end"
        useContext={ true }
        open={ showForm }
        onRequestClose={ this.handleFormToggle }
        html={
          <TableCreateForm onSubmit={ this.handleBlockAdd } />
        }
      >
        <button type="button" className="table-tool editor-button" onClick={ this.handleFormToggle }>
          { t('add_table') }
          <Icon name="table" className="table-tool__icon editor-button__icon" />
        </button>
      </ToolTip>
    );
  }
}

TableTool = withNamespaces()(TableTool);

export default TableTool;
