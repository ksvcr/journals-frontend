import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './multi-switch.scss';

class MultiSwitch extends Component {
  state = { color: null };

  handleChange = (event) => {
    const { input = {} } = this.props;
    const { value, dataset } = event.target;
    const { color } = dataset;
    this.setState({ color });
    const onChange = input.onChange ? input.onChange : this.props.onChange;
    onChange(value);
  };

  renderOptions = () => {
    const { options, input = {} } = this.props;
    let name = input.name ? input.name : this.props.name;
    let value = input.value ? input.value : this.props.value;

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
    const {input} = this.props;
    const { color } = this.state;
    let value = input.value ? input.value : this.props.value;

    const switchClasses = classNames('multi-switch', {
      'multi-switch_checked': value,
      [`multi-switch_${color}`]: color
    });

    return (
      <div className={ switchClasses }>
        { this.renderOptions() }
      </div>
    );
  }
}

MultiSwitch.defaultProps = {
  input: {}
};

MultiSwitch.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func
};

export default MultiSwitch;
