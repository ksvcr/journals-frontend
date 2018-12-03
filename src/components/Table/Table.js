import React, { Component } from 'react';
import Renderer from '~/components/Renderer/Renderer';

import './table.scss';

class Table extends Component {
  renderCells = (data) => {
    return data.map((item, index) => (
      <td key={ index }>
        <Renderer raw={ item }/>
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
    const { data, index } = this.props;
    return (
      <div className="table">
        <div className="table__title">
          { `Таблица ${index+1} - ${data.title}` }
        </div>
        <table className="table__box">
          <tbody>
            { this.renderRows(data) }
          </tbody>
        </table>
        <div className="table__additional">
          { data.additional }
        </div>
      </div>
    );
  }
}

export default Table;
