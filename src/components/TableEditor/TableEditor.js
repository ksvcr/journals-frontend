import React, { Component } from 'react';
import { EditorBlock } from 'draft-js';

import './table-editor.scss';

class TableEditor extends Component {
  renderCells = (data) => {
    const { editorProps } = this.props;
    console.log(editorProps);
    return data.map((item, index) => (
      <td key={ index }>
        <EditorBlock block={ editorProps.block } tree={ editorProps.tree } />
      </td>
    ));
  };

  renderRows = (data) => {
    return data.rows.map((item, index) => (
      <tr key={ index }>
        { this.renderCells(item) }
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
