import React, { Component } from 'react';
import { FocusDecorator } from 'draft-js-focus-plugin';
import { tableCreator, tableStyles } from 'draft-js-table-plugin';
import Editor from 'draft-js-plugins-editor';
import { genKey } from 'draft-js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Table = FocusDecorator(
  tableCreator({ theme: tableStyles, Editor })
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

    this.state = {
      showTable: true,
      numberOfColumns: entityData.numberOfColumns || 1,
      rows: entityData.rows || [{}]
    };
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
    return (
      <div className="table-editor">
        <button type="button" onClick={ this.addRow }>
          Добавить строку
        </button>
        <button type="button" onClick={ this.addColumn }>
          Добавить колонку
        </button>
        <ReactCSSTransitionGroup transitionName="fade"
                                 transitionEnterTimeout={ 400 }
                                 transitionLeave={ false } >
          { this.state.showTable &&
            <Table { ...this.props } blockProps={ this.blockProps } />
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default TableEditor;
