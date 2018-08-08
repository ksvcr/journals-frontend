import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './list.scss';

class List extends PureComponent {
  renderRows = () => {
    const { data } = this.props;
    return data.map(this.renderRow);
  };

  renderRow = (data) => {
    return (
      <div className="list__row" key={ data.id }>
        { this.renderCells(data) }
      </div>
    );
  };

  renderHead = () => {
    return (
      <div className="list__row list__row_head" key={ 'list-head' }>
        { this.renderCells(null, true) }
      </div>
    );
  };

  renderCells = (data, isHead) => {
    const { cells } = this.props;
    const classes = classNames('list__cell', { 'list__cell_head': isHead });

    return cells.map((cell, index) => {
      const render = isHead ? cell.head() : cell.render(data);
      return (
        <div className={ classes } key={index} style={ cell.style }>
          { render }
        </div>
      );
    });
  };

  render() {
    const { head } = this.props;
    return (
      <div className="list">
        <div className="list__holder">
          { head && this.renderHead() }
          { this.renderRows() }
        </div>
      </div>
    );
  }
}

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ).isRequired,
  cells: PropTypes.arrayOf(
    PropTypes.shape({
      style: PropTypes.object,
      head: PropTypes.func,
      render: PropTypes.func.isRequired
    })
  ).isRequired
};

export default List;
