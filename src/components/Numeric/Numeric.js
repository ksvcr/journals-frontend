import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './numeric.scss';

class Numeric extends Component {
  handleDecrease = () => {
    const { input, min } = this.props;
    if (input.value > min) {
      const newValue = input.value - 1;
      input.onChange(newValue);
    }
  };

  handleIncrease = () => {
    const { input, max } = this.props;
    if (max === null || input.value < max) {
      const newValue = input.value + 1;
      input.onChange(newValue);
    }
  };

  render() {
    const { input, label, max, min  } = this.props;
    const valueString = `${input.value} ${label}`;
    return (
      <div className="numeric">
        <button className="numeric__button numeric__button_minus" type="button"
                disabled={ input.value <= min } onClick={ this.handleDecrease } />
        <div className="numeric__value"> { valueString } </div>
        <button className="numeric__button numeric__button_plus" type="button"
                disabled={ max !== null && input.value >= max } onClick={ this.handleIncrease } />
      </div>
    );
  }
}

Numeric.defaultProps = {
  input: {},
  min: 0,
  max: null
};

Numeric.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number
};

export default Numeric;
