import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Paginator from '~/components/Paginator/Paginator';
import PageSizer from '~/components/PageSizer/PageSizer';

import * as paginateActions from '~/store/paginate/actions';

import './paginate-line.scss';

class PaginateLine extends Component {
  handlePageChange = (newCurrent) => {
    const { setCurrent, limit, onChange } = this.props;
    const offset = (newCurrent-1)*limit;
    setCurrent(offset);
    onChange();
  };
  
  handleLimitChange = (newLimit) => {
    const { total, limit, setLimit, setCurrent, onChange } = this.props;
    const totalPageAmount = Math.ceil(total/newLimit);
    setLimit(newLimit);
    // Сброс offset в случае если он больше чем кол-во страниц
    if (this.current > totalPageAmount) {
      const offset = (totalPageAmount-1)*limit;
      setCurrent(offset);
    }
    onChange();
  };

  get current() {
    const { offset, limit } = this.props;
    return Math.ceil((offset+1)/limit)
  }

  render() {
    const { limit, total } = this.props;
    const totalPageAmount = Math.ceil(total/limit);
    return (
      <div className="paginate-line">
        <div className="paginate-line__item">
          <Paginator current={ this.current }
                     total={ totalPageAmount } onChange={ this.handlePageChange } />
        </div>
        <div className="paginate-line__item">
          <PageSizer onChange={ this.handleLimitChange } />
        </div>
      </div>
    );
  }
}

PaginateLine.propTypes = {
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func
};

function mapStateToProps(state) {
  const { limit, offset } = state.paginate;
  return {
    limit,
    offset
  };
}

const mapDispatchToProps = {
  setCurrent: paginateActions.setOffset,
  setLimit: paginateActions.setLimit,
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(PaginateLine);
