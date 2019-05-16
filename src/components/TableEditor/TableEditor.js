import React, { Component } from 'react';
import { FocusDecorator } from 'draft-js-focus-plugin';
import { tableCreator } from 'draft-js-table-plugin';
import Editor from 'draft-js-plugins-editor';
import { EditorState, genKey } from 'draft-js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { withNamespaces } from 'react-i18next';
import nanoid from 'nanoid';

import MetaInfoForm from '~/components/MetaInfoForm/MetaInfoForm';
import ToolTip from '~/components/ToolTip/ToolTip';
import Icon from '~/components/Icon/Icon';
import { removeRange } from '~/services/customDraftUtils';

import './assets/cancel.svg';
import './table-editor.scss';

const Table = FocusDecorator(
  tableCreator({
    theme: { table: 'table-editor__box', even: 'table-editor__even' },
    Editor
  })
);

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

class TableEditor extends Component {
  constructor(props) {
    super(props);
    const { blockProps } = this.props;
    const { entityData } = blockProps;
    this.formId = nanoid();
    this.state = {
      meta: {},
      tableKey: 0,
      rows: entityData.rows || [{}]
    };
  }

  componentDidMount() {
    const { contentState, block } = this.props;
    this.entityKey = block.getEntityAt(0);
    if (this.entityKey) {
      this.entity = contentState.getEntity(this.entityKey);
    }
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
    const { t, blockProps } = this.props;
    const { entityData } = blockProps;
    const { title = t('table_header'), additional, keywords } = entityData;
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
    const { tableKey } = this.state;
    const { t, blockProps } = this.props;
    const { entityData } = blockProps;
    return (
      <div className="table-editor" contentEditable={ false } readOnly>
        <div className="table-editor__top">
          <button type="button" onClick={ this.handleRemove } className="table-editor__remove-button">
            <Icon name="cancel"  className="table-editor__remove-icon" />
            Удалить
          </button>
        </div>
        <div className="table-editor__holder">
          <h3 className="table-editor__title">
            { entityData.title ? entityData.title : t('table_header') }
          </h3>

          <div className="table-editor__toolbar">
            <button
              className="table-editor__button"
              type="button"
              onClick={ this.addRow }
            >
              { t('add_row') }
            </button>
            <button
              className="table-editor__button"
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
              <button className="table-editor__button" type="button">
                { t('edit_meta_data') }
              </button>
            </ToolTip>
          </div>
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={ 300 }
            transitionLeave={ false }
          >
            <Table
              { ...this.props }
              key={ tableKey }
              blockProps={ this.blockProps }
            />
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

TableEditor = withNamespaces()(TableEditor);

export default TableEditor;
