import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './select.scss';

class Select extends Component {
  renderOptions = () => {
    const { options } = this.props;

    return options.map(option => {
      let value, title;

      if (typeof option === 'object') {
        value = option.value;
        title = option.title;
      } else {
        value = title = option;
      }

      return (
        <option value={ value } key={ value }>
          { title }
        </option>
      )
    })
  };

  render() {
    const { meta, value, input, id, disabled, required, className, onChange } = this.props;
    const classes = classNames('select', className,
      { 'select_error': meta && meta.submitFailed && meta.error });

    if (value) {
      input.value = value;
    }

    return (
      <div className={ classes }>
        <select id={ id } disabled={ disabled } required={ required }
                onChange={ onChange } { ...input } className="select__field">
          { this.renderOptions() }
        </select>
      </div>
    );
  }
}

Select.defaultProps = {
  input: {}, // Props from redux-form field
  meta: {}
};

Select.propTypes = {
  options: PropTypes.array.isRequired
};

export default Select;
