import React, { Component } from 'react';
import { genKey } from 'draft-js';
import { withNamespaces } from 'react-i18next';
import nanoid from 'nanoid';

import MetaInfoForm from '~/components/MetaInfoForm/MetaInfoForm';
import ToolTip from '~/components/ToolTip/ToolTip';
import Icon from '~/components/Icon/Icon';
import TableEditor from '~/components/TableEditor/TableEditor';

import { removeRange } from '~/services/customDraftUtils';

import './assets/cancel.svg';
import './table-editor-wrapper.scss';

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

  addColumn = () => {
    const { data, onChange } = this.props;
    const { rows } = data;

    const newRows = rows.map(row => {
      row.push(cellData);
      return row;
    });

    onChange({ ...data, rows: newRows });
  };

  addRow = () => {
    const { data, onChange } = this.props;
    const { rows } = data;
    const numberOfColumns = rows[0].length;
    const newRow = [];
    for (let i = 0; i <= numberOfColumns - 1; i++) {
      newRow.push(cellData);
    }
    const newRows = [...rows, newRow];
    onChange({ ...data, rows: newRows });
  };

  handleMetaChange = (id, formData) => {
    this.meta = formData;
  };

  handleMetaClose = () => {
    const { data, onChange } = this.props;
    onChange({ ...data, ...this.meta });
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
    const { t, data, onRemove, editorProps } = this.props;
    return (
      <div className="table-editor-wrapper">
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
          <TableEditor data={ data } editorProps={ editorProps }/>
        </div>
      </div>
    );
  }
}

TableEditorWrapper = withNamespaces()(TableEditorWrapper);

export default TableEditorWrapper;
