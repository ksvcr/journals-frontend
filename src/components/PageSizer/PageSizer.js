import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Select from '../Select/Select';

import './page-sizer.scss';

class PageSizer extends Component {
  handleChange = (event) => {
    const { value } = event.target;
    const { onChange } = this.props;
    onChange(value);
  };

  render() {
    const { sizes } = this.props;
    return (
      <div className="page-sizer">
        <div className="page-sizer__text">
          Показывать по
        </div>
        <div className="page-sizer__holder">
          <Select options={ sizes } onChange={ this.handleChange } className="select_small" />
        </div>
      </div>
    );
  }
}

PageSizer.defaultProps = {
  sizes: [5, 10, 50]
};

PageSizer.propTypes = {
  sizes: PropTypes.array.isRequired,
  onChange: PropTypes.func
};

export default PageSizer;
