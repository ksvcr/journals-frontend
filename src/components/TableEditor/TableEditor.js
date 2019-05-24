import React, { Component, PureComponent } from 'react';
import ContentEditable from 'react-contenteditable';

import './table-editor.scss';

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
  // TODO: Смещаются индексы на следующей строке. Возможный вариант решения осталять пустую ячейку вместо удаления
  handleMergeCol = (row, cell) => {
    const { data, onChange } = this.props;
    const newData = [ ...data ];

    const currentCell = newData[row][cell];

    const nextCells = [];

    for (let i = 0; i < currentCell.rowspan; i++) {
      const newCell = newData[row + i][cell + 1];
      if (newCell) {
        nextCells.push(newCell);
      }
    }

    currentCell.content = nextCells.reduce((result, item) => {
      return `${result} ${item.content}`;
    }, currentCell.content);

    currentCell.colspan = nextCells.reduce((result, item) => {
      return result + item.colspan;
    }, currentCell.colspan);
    
    for (let i = 0; i < currentCell.rowspan; i++) {
      newData[row + i].splice(cell + 1, 1);
    }

    onChange(newData);
  };

  handleMergeRow = (row, cell) => {
    const { data, onChange } = this.props;
    const newData = [ ...data ];

    const currentCell = newData[row][cell];

    const nextCells = [];

    for (let i = 0; i < currentCell.colspan; i++) {
      const newCell = newData[row + 1][cell + i];
      if (newCell) nextCells.push(newCell);
    }


    currentCell.content = nextCells.reduce((result, item) => {
      return `${result} ${item.content}`;
    }, currentCell.content);

    currentCell.rowspan = currentCell.rowspan + newData[row + 1][cell].rowspan;

    newData[row + (currentCell.rowspan-1)].splice(cell, currentCell.colspan);

    onChange(newData);
  };

  renderCells = (data, rowIndex) => {
    const { onInteract } = this.props;

    return data.map((item, index) => (
      <td key={ index } colSpan={ item.colspan } rowSpan={ item.rowspan }>
        <div className="table-editor__cell">
          <button type="button" onClick={ () => this.handleMergeRow(rowIndex, index) }>merge row</button>
          <button type="button" onClick={ () => this.handleMergeCol(rowIndex, index) }>merge cell</button>
          <TableEditorContent content={ item.content } row={ rowIndex } cell={ index }
                              onChange={ this.handleChange } onInteract={ onInteract } />
        </div>
      </td>
    ));
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
