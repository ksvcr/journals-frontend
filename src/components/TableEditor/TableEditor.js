import React, { Component } from 'react';
import { FocusDecorator } from 'draft-js-focus-plugin';
import { tableCreator } from 'draft-js-table-plugin';
import Editor from 'draft-js-plugins-editor';
import { EditorState, genKey } from 'draft-js';
import draftPluginsUtils from 'draft-js-plugins-utils';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import MetaInfoForm from '~/components/MetaInfoForm/MetaInfoForm';
import nanoid from 'nanoid';
import ToolTip from '~/components/ToolTip/ToolTip';

import './table-editor.scss';

const Table = FocusDecorator(
  tableCreator({ theme: { table: 'table-editor__box', even: 'table-editor__even' }, Editor })
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
      showTable: true,
      numberOfColumns: entityData.numberOfColumns || 1,
      rows: entityData.rows || [{}]
    };
  }

  componentDidMount() {
    const { blockProps, contentState } = this.props;
    const { pluginEditor } = blockProps;
    const { getEditorState } = pluginEditor;
    const editorState = getEditorState();
    this.entityKey = draftPluginsUtils.getCurrentEntityKey(editorState);
    if (this.entityKey) {
      this.entity = contentState.getEntity(this.entityKey);
    }
  }

  // Переопределяем стандартные методы добавления колонки/строки чтобы изменить текст плейсхолдера
  addColumn = () => {
    // showTable нужен для ремаунта таблицы, так как нужно переопредеоить default state
    this.setState({ showTable: false });
    const { numberOfColumns, rows } = this.state;
    const newNumberOfColumns = (numberOfColumns || 1) + 1;
    const newRows = rows.map(row => {
      row.push(cellData);
      return row;
    });

    setTimeout(() => {
      this.setState({
        numberOfColumns: newNumberOfColumns,
        rows: newRows,
        showTable: true
      });
    }, 0);
  };

  addRow = () => {
    this.setState({ showTable: false });
    const { numberOfColumns, rows } = this.state;
    const newRow = [];
    for (let i = 0; i<=numberOfColumns; i++) {
      newRow.push(cellData);
    }
    const newRows = [ ...rows, newRow ];

    setTimeout(() => {
      this.setState({
        rows: newRows,
        showTable: true
      });
    }, 0);
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

    contentState.replaceEntityData(
      this.entityKey,
      data
    );

    setEditorState(EditorState.forceSelection(editorState, selection));
  };

  get initialMeta() {
    const { blockProps } = this.props;
    const { entityData } = blockProps;
    const { title='Заголовок таблицы', additional, keywords } = entityData;
    return { title, additional, keywords };
  }

  get blockProps() {
    const { blockProps } = this.props;
    const { numberOfColumns, rows } = this.state;
    return { ...blockProps,
      entityData: { ...blockProps.entityData,
        numberOfColumns,
        rows
      },
    };
  }

  render() {
    const { blockProps } = this.props;
    const { entityData } = blockProps;
    return (
      <div className="table-editor" contentEditable={ false } readOnly>
        <div className="table-editor__holder" >
          <h3 className="table-editor__title">
            { entityData.title ? entityData.title : 'Заголовок таблицы' }
          </h3>

          <div className="table-editor__toolbar" >
            <button className="table-editor__button" type="button" onClick={ this.addRow }>
              Добавить строку
            </button>
            <button className="table-editor__button" type="button" onClick={ this.addColumn }>
              Добавить колонку
            </button>
            <ToolTip className="tooltip" position="right-start" useContext={ true }
                     onRequestClose={ this.handleMetaClose }
                     html={
                       <MetaInfoForm id={ this.formId }
                                     onChange={ this.handleMetaChange }
                                     initialValues={ this.initialMeta } /> } >
              <button className="table-editor__button" type="button">
                Редактировать мета-данные
              </button>
            </ToolTip>
          </div>
          <ReactCSSTransitionGroup transitionName="fade"
                                   transitionEnterTimeout={ 300 }
                                   transitionLeave={ false } >
            { this.state.showTable &&
              <Table { ...this.props } blockProps={ this.blockProps } />
            }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default TableEditor;
