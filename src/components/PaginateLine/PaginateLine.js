import React, {Component} from 'react';
import {connect} from 'react-redux';

import Paginator from '~/components/Paginator/Paginator';
import PageSizer from '~/components/PageSizer/PageSizer';

import {setCurrent, setSize} from '~/store/paginate/actions';

import './paginate-line.scss';

class PaginateLine extends Component {
  handlePageChange = (value) => {
    const { setCurrent } = this.props;
    setCurrent(value);
  };
  
  handleSizeChange = (value) => {
    const { setSize } = this.props;
    setSize(value);
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

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrent: (value) => dispatch(setCurrent(value)),
    setSize: (value) => dispatch(setSize(value))
  }
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(PaginateLine);
