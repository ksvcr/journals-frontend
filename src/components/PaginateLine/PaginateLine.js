import React, {Component} from 'react';
import {connect} from 'react-redux';

import Paginator from '~/components/Paginator/Paginator';
import PageSizer from '~/components/PageSizer/PageSizer';

import * as paginateActions from '~/store/paginate/actions';

import './paginate-line.scss';

class PaginateLine extends Component {
  handlePageChange = (newCurrent) => {
    const { setCurrent } = this.props;
    setCurrent(newCurrent);
  };
  
  handleSizeChange = (newSize) => {
    const { current, total, setSize, setCurrent } = this.props;
    setSize(newSize);
    const newCurrent = Math.ceil(total/newSize);
    if (current > newCurrent) {
      setCurrent(newCurrent);
    }
  };

  get totalAmount() {
    const { size, total } = this.props;
    return Math.ceil(total/size);
  }

  render() {
    const { current } = this.props;
    return (
      <div className="paginate-line">
        <div className="paginate-line__item">
          <Paginator current={ current }
                     total={ this.totalAmount } onChange={ this.handlePageChange } />
        </div>
        <div className="paginate-line__item">
          <PageSizer onChange={ this.handleSizeChange } />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { size, current } = state.paginate;
  return {
    size,
    current
  };
}

const mapDispatchToProps = {
  setCurrent: paginateActions.setCurrent,
  setSize: paginateActions.setSize
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(PaginateLine);
