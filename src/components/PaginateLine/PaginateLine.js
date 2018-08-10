import React, {Component} from 'react';
import {connect} from 'react-redux';
import Paginator from '~/components/Paginator/Paginator';
import {setCurrent} from '~/store/paginate/actions';

class PaginateLine extends Component {
  handleChange = (value) => {
    const { dispatch } = this.props;
    dispatch(setCurrent(value));
  };

  render() {
    const { size, current, total } = this.props;
    return (
      <div className="paginate-line">
        <Paginator current={ current } size={ size }
                   total={ total } onChange={ this.handleChange } />
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

export default connect(
  mapStateToProps,
)(PaginateLine);
