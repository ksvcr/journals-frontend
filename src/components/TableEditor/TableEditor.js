import React, { Component, PureComponent } from 'react';
import ContentEditable from 'react-contenteditable';

import Icon from '~/components/Icon/Icon';

import './table-editor.scss';
import './assets/merge.svg';

class TableEditorContent extends PureComponent {
  constructor(props) {
    super(props);
    this.value = null;
  }

  handleChange = (event) => {
    let { value } = event.target;
    const tmp = document.createElement('div');
    tmp.innerHTML = value;
    value = tmp.textContent;
    value = value ? value : '';

    this.value = value;
  };

  handleBlur = () => {
    const { onChange, row, cell } = this.props;
    onChange({
      row, cell,
      value: this.value
    });

    this.value = null;
  };

  render() {
    const { content, onInteract } = this.props;
    return (
      <ContentEditable html={ content } onFocus={ onInteract } onBlur={ this.handleBlur }
                       onChange={ this.handleChange }  className="table-editor__content" />
    );
  }
}

class TableEditor extends Component {
  handleChange = ({ row, cell, value }) => {
    const { data, onChange, onCancelInteract } = this.props;
    if (value) {
      const newData = [ ...data ];
      newData[row][cell].content = value;
      onChange(newData);
    } else {
      onCancelInteract();
    }
  };

  handleMergeCol = (row, cell) => {
    const { data, onChange } = this.props;
    const newData = [ ...data ];

    const currentCell = newData[row][cell];
    const currentColspan = currentCell.colspan;

    for (let i = 0; i < currentCell.rowspan; i++) {
      const nextCell = newData[row + i][cell + currentColspan];
      currentCell.content = `${currentCell.content} ${nextCell.content}`;

      if (i === 0) {
        currentCell.colspan = currentCell.colspan + nextCell.colspan;
      }
      nextCell.content = '';
      nextCell.merged = 'col';
    }

    onChange(newData);
  };

  handleMergeRow = (row, cell) => {
    const { data, onChange } = this.props;
    const newData = [ ...data ];

    const currentCell = newData[row][cell];
    const currentRowspan = currentCell.rowspan;

    for (let i = 0; i < currentCell.colspan; i++) {
      const nextCell = newData[row + currentRowspan][cell + i];
      currentCell.content = `${currentCell.content} ${nextCell.content}`;

      if (i === 0) {
        currentCell.rowspan = currentCell.rowspan + nextCell.rowspan;
      }
      nextCell.content = '';
      nextCell.merged = 'row' ;
    }

    onChange(newData);
  };

  canColMerge = (row, cell) => {
    const { data } = this.props;
    const isLast = data[row].slice(cell + 1).every(item => item.merged);
    const currentCell = data[row][cell];
    const nextCell = data[row][cell + 1];
    const nextIsMerged = !isLast && (nextCell.merged === 'row' || currentCell.rowspan < nextCell.rowspan);
    return !isLast && !nextIsMerged;
  };

  canRowMerge = (row, cell) => {
    const { data } = this.props;
    const isLast = data.slice(row + 1).every(item => item[cell].merged);
    const currentCell = data[row][cell];
    const nextCell = !isLast && data[row + 1][cell];
    const nextIsMerged = !isLast && (nextCell.merged === 'col' || currentCell.colspan < nextCell.colspan);

    return !isLast && !nextIsMerged;
  };

  renderCells = (data, rowIndex) => {
    const { onInteract } = this.props;
    return data.map((item, index) => {
      return !item.merged ? (
        <td key={ index } colSpan={ item.colspan } rowSpan={ item.rowspan }>
          <div className="table-editor__cell">
            { this.canRowMerge(rowIndex, index) &&
              <button type="button" className="table-editor__merge-button table-editor__merge-button_row"
                      onClick={ () => this.handleMergeRow(rowIndex, index) }>
                <Icon name="merge" className="table-editor__merge-icon" />
                Объедененить со следующей строкой
              </button>
            }

            { this.canColMerge(rowIndex, index) &&
              <button type="button" className="table-editor__merge-button table-editor__merge-button_col"
                      onClick={ () => this.handleMergeCol(rowIndex, index) }>
                <Icon name="merge" className="table-editor__merge-icon" />
                Объедененить со следующей колонкой
              </button>
            }
            <TableEditorContent content={ item.content } row={ rowIndex } cell={ index }
                                onChange={ this.handleChange } onInteract={ onInteract } />
          </div>
        </td>
      ) : null
    });
  };

  renderRows = (data) => {
    return data.map((item, index) => (
      <tr key={ index }>
        { this.renderCells(item, index) }
      </tr>
    ));
  };

  render() {
    const { data } = this.props;
    return (
      <div className="table-editor">
        <table className="table-editor__box">
          <tbody>
            { this.renderRows(data) }
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableEditor;
