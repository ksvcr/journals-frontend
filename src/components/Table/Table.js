import React, { Component } from 'react';

import Renderer from '~/components/Renderer/Renderer';
import './table.scss';

class Table extends Component {
  renderCells = (data) => {
    return data.map((item, index) => {
      const { attrs, content } = item;
      return (
        <td key={ index } colSpan={ attrs.colspan } rowSpan={ attrs.rowspan }>
          { content.map((item, index) => <Renderer raw={ item } key={ index } />) }
        </td>
      );
    });
  };

  renderRows = (data) => {
    return data.map((item, index) => (
      <tr key={ index }>
        { this.renderCells(item.content) }
      </tr>
    ));
  };

  render() {
    const { data } = this.props;
    const { attrs, content } = data;
    return (
      <div className="table">
        <div className="table__title">
          { attrs.title }
        </div>
        <div className="table__doi">
          DOI:
          <a href="/" className="table__doi-link">
            https://doi.org/10.18454/IRJ.2016.44.041
          </a>
        </div>
        <table className="table__box">
          <tbody>
            { this.renderRows(content) }
          </tbody>
        </table>
        <div className="table__additional">
          { attrs.additional }
        </div>
      </div>
    );
  }
}

export default Table;
