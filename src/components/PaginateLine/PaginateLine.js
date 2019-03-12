import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paginator from '~/components/Paginator/Paginator';
import PageSizer from '~/components/PageSizer/PageSizer';

import './paginate-line.scss';

class PaginateLine extends Component {
  handlePageChange = (newCurrent) => {
    const { limit, onChange } = this.props;
    const offset = (newCurrent - 1) * limit;

    if (newCurrent > this.totalPageAmount) {
      return;
    }

    onChange({ limit, offset });
  };

  handleLimitChange = (newLimit) => {
    const { total, limit, offset, onChange } = this.props;
    const totalPageAmount = Math.ceil(total / newLimit);
    const data = { limit: newLimit, offset };
    // Сброс offset в случае если он больше чем кол-во страниц
    if (this.current > totalPageAmount) {
      data.offset = (totalPageAmount - 1) * limit;
    }
    onChange(data);
  };

  get current() {
    const { offset, limit } = this.props;
    return Math.ceil((offset + 1) / limit)
  }

  get totalPageAmount() {
    const { limit, total } = this.props;
    return Math.ceil(total / limit);
  }

  render() {
    const { limit } = this.props;
    return (
      <div className="paginate-line">
        <div className="paginate-line__item">
          <Paginator current={ this.current }
                     total={ this.totalPageAmount } onChange={ this.handlePageChange } />
        </div>
        <div className="paginate-line__item">
          <PageSizer value={ limit } onChange={ this.handleLimitChange } />
        </div>
      </div>
    );
  }
}

PaginateLine.propTypes = {
  total: PropTypes.number.isRequired,
  limit: PropTypes.number,
  offset: PropTypes.number,
  onChange: PropTypes.func
};

export default PaginateLine;
