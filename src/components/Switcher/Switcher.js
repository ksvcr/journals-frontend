import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Switcher extends PureComponent {
  render() {
    const { trueLabel, falseLabel, input, ...rest } = this.props;

    return (
      <label className="switcher">
        <span className="switcher__label">
          { trueLabel }
        </span>
        <input type="checkbox" className="switcher__input" { ...input } { ...rest } />
        <span className="switcher__label">
          { falseLabel }
        </span>
      </label>
    );
  }
}

Switcher.defaultProps = {
  trueLabel: 'Да',
  falseLabel: 'Нет'
};

Switcher.propTypes = {
  trueLabel: PropTypes.string,
  falseLabel: PropTypes.string
};

export default Switcher;
