import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './multi-switch.scss';

class MultiSwitch extends Component {
  state = { color: null };

  handleChange = (event) => {
    let { value } = event.target;
    const { color } = event.target.dataset;
    const { onChange } = this.props;
    this.setState({ color });
    value = parseInt(value, 10);
    onChange(value);
  };

  renderOptions = () => {
    const { options, value, name } = this.props;
    return options.map((item, index) =>
      <label className="multi-switch__option" key={ index }>
        <input name={ name } type="radio" checked={ item.value === value }
               data-color={ item.color || null } value={ item.value }
               onChange={ this.handleChange }
               className="multi-switch__input" />
        <span className="multi-switch__label">
          { item.title }
        </span>
      </label>
    );
  };

  render() {
    const { value } = this.props;
    const { color } = this.state;
    const switchClasses = classNames('multi-switch', {
      'multi-switch_checked': value,
      "multi-switch_orange": color==='orange',
      'multi-switch_red': color==='red'
    });
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
