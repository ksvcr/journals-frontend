import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// import './select.scss';

class DynamicSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  renderOptions = () => {
    const { options } = this.props;

    return options.map(option => {
      let value, title;

      if (typeof option === 'object') {
        value = option.value;
        title = option.label;
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

  handleInputChange = (newValue) => {
    const { onInputChange } = this.props;
    onInputChange(newValue);
  };

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ value: event.target.value });
  };

  render() {
    const { meta, value, input, id, disabled, required, className, onChange } = this.props;
    const classes = classNames('select', className,
      { 'select_error': meta && meta.submitFailed && meta.error });

    if (value) {
      input.value = value;
    }

    return (
      <div>
        <AsyncSelect id={ id } disabled={ disabled } required={ required }
                     onChange={ this.handleChange } cacheOptions defaultOptions={ this.props.options }
                     onInputChange={ this.handleInputChange } { ...input } value={ this.state.value } />
      </div>
    );
  }
}

DynamicSelect.defaultProps = {
  input: {}, // Props from redux-form field
  meta: {}
};

DynamicSelect.propTypes = {
  options: PropTypes.array.isRequired
};

export default DynamicSelect;
