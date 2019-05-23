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
                       onChange={ this.handleChange } />
    );
  }
}

class TableEditor extends Component {
  handleChange = ({ row, cell, value }) => {
    const { data, onChange, onCancelInteract } = this.props;
    console.log(value);
    if (value) {
      const newData = [ ...data ];
      newData[row][cell] = value;
      onChange(newData);
    } else {
      onCancelInteract()
    }
  };

  renderCells = (data, rowIndex) => {
    const { onInteract } = this.props;

    return data.map((item, index) => (
      <td key={ index }>
        <TableEditorContent content={ item } row={ rowIndex } cell={ index }
                            onChange={ this.handleChange } onInteract={ onInteract } />
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
