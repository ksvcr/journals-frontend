import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './switcher.scss';

class Switcher extends PureComponent {
  render() {
    const { trueLabel, falseLabel, input, ...rest } = this.props;

    return (
      <label className="switcher">
        <input type="checkbox" className="switcher__input" { ...input } { ...rest } />
        <span className="switcher__label switcher__label_true">
          { trueLabel }
        </span>
        <i className="switcher__icon" />
        <span className="switcher__label switcher__label_false">
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
