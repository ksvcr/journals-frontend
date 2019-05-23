import React, { Component } from 'react';
import { EditorState, genKey } from 'draft-js';
import { withNamespaces } from 'react-i18next';
import nanoid from 'nanoid';

import MetaInfoForm from '~/components/MetaInfoForm/MetaInfoForm';
import ToolTip from '~/components/ToolTip/ToolTip';
import Icon from '~/components/Icon/Icon';
import Table from '~/components/Table/Table';
import { removeRange } from '~/services/customDraftUtils';

import './assets/cancel.svg';
import './table-editor.scss';

const cellData = {
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
};

class TableEditorWrapper extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.formId = nanoid();
    this.state = {
      meta: {},
      tableKey: 0,
      rows: data.rows || [{}]
    };
  }

  // Переопределяем стандартные методы добавления колонки/строки чтобы изменить текст плейсхолдера
  // Ресетим internal state при помоши обновления key
  addColumn = () => {
    this.setState(({ rows, tableKey }) => {
      const newRows = rows.map(row => {
        row.push(cellData);
        return row;
      });

      return {
        rows: newRows,
        tableKey: tableKey + 1
      };
    });
  };

  addRow = () => {
    this.setState(({ rows, tableKey }) => {
      const numberOfColumns = rows[0].length;
      const newRow = [];
      for (let i = 0; i <= numberOfColumns - 1; i++) {
        newRow.push(cellData);
      }
      const newRows = [...rows, newRow];
      return {
        rows: newRows,
        tableKey: tableKey + 1
      };
    });
  };

  handleMetaChange = (id, formData) => {
    this.meta = formData;
  };

  handleMetaClose = () => {
    const { contentState, blockProps } = this.props;
    const { pluginEditor } = blockProps;
    const { getEditorState, setEditorState } = pluginEditor;
    const editorState = getEditorState();
    const selection = editorState.getSelection();

    const data = { ...this.entity.getData(), ...this.meta };

    contentState.replaceEntityData(this.entityKey, data);

    setEditorState(EditorState.forceSelection(editorState, selection));
  };

  get initialMeta() {
    const { t, data } = this.props;
    const { title = t('table_header'), additional, keywords } = data;
    return { title, additional, keywords };
  }

  get blockProps() {
    const { blockProps } = this.props;
    const { rows } = this.state;
    return {
      ...blockProps,
      entityData: {
        ...blockProps.entityData,
        rows,
        numberOfColumns: rows[0].length
      }
    };
  }

  handleRemove = () => {
    const { block, blockProps } = this.props;
    removeRange(block, blockProps);
  };

  render() {
    const { t, data, onRemove } = this.props;
    return (
      <div className="table-editor-wrapper" contentEditable={ false } readOnly>
        <div className="table-editor-wrapper__top">
          <button type="button" onClick={ onRemove } className="table-editor-wrapper__remove-button">
            <Icon name="cancel"  className="table-editor-wrapper__remove-icon" />
            { t('delete') }
          </button>
        </div>
        <div className="table-editor-wrapper__holder">
          <h3 className="table-editor-wrapper__title">
            { data.title ? data.title : t('table_header') }
          </h3>

          <div className="table-editor-wrapper__toolbar">
            <button
              className="table-editor-wrapper__button"
              type="button"
              onClick={ this.addRow }
            >
              { t('add_row') }
            </button>
            <button
              className="table-editor-wrapper__button"
              type="button"
              onClick={ this.addColumn }
            >
              { t('add_column') }
            </button>
            <ToolTip
              className="tooltip"
              position="right-start"
              useContext={ true }
              onRequestClose={ this.handleMetaClose }
              html={
                <MetaInfoForm
                  id={ this.formId }
                  onChange={ this.handleMetaChange }
                  initialValues={ this.initialMeta }
                />
              }
            >
              <button className="table-editor-wrapper__button" type="button">
                { t('edit_meta_data') }
              </button>
            </ToolTip>
          </div>
          <Table data={ data }/>
        </div>
      </div>
    );
  }
}

TableEditorWrapper = withNamespaces()(TableEditorWrapper);

export default TableEditorWrapper;
