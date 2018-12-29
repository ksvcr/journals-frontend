import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './multi-switch.scss';

class MultiSwitch extends Component {
  handleChange = (event) => {
    const { value } = event.target;
    const { onChange } = this.props;
    onChange(value);
  };

  renderOptions = () => {
    const { options, value, name } = this.props;
    return options.map((item, index) =>
      <label className="multi-switch__option" key={ index }>
        <input name={ name } type="radio" checked={ item.value === value }
               value={ item.value } onChange={ this.handleChange }
               className="multi-switch__input" />
        <span className="multi-switch__label">
          { item.title }
        </span>
      </label>
    );
  };

  render() {
    const { value } = this.props;
    const switchClasses = classNames('multi-switch', { 'multi-switch_checked': value });
    return (
      <div className={ switchClasses }>
        { this.renderOptions() }
      </div>
    );
  }
}

MultiSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func
};

export default MultiSwitch;
