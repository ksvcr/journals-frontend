import React, { Component } from 'react';
import Select, { components } from 'react-select';
import classNames from 'classnames';

import './searchable-select.scss';

// onMouseMove, onMouseOver тормозят на больших списках
const Option = ({ children, ...props }) => {
  const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  const newProps = Object.assign(props, { innerProps: rest });
  return (
    <components.Option { ...newProps }>
      { children }
    </components.Option>
  );
};

class SearchableSelect extends Component {
  handleChange = selectedOption => {
    const { input } = this.props;
    input.onChange(selectedOption);
  };

  getOptionValue = option => option.id;
  getOptionLabel = option => option.name;
  noOptionsMessage = () => 'Ничего не найдено';

  render() {
    const { input, meta, id, options, required, placeholder } = this.props;
    const hasError = meta && meta.submitFailed && meta.error;
    const classes = classNames(
      'searchable-select-wrapper searchable-select-wrapper_white',
      { 'searchable-select-wrapper_error': hasError }
    );
    return (
      <React.Fragment>
        <Select id={ id }
                required={ required }
                components={ { Option } }
                className={ classes }
                classNamePrefix="searchable-select"
                value={ input.value }
                placeholder={ placeholder }
                noOptionsMessage={ this.noOptionsMessage }
                getOptionValue={ this.getOptionValue }
                getOptionLabel={ this.getOptionLabel }
                options={ options }
                onChange={ this.handleChange }
                onBlur={ () => input.onBlur(input.value) } />
        { hasError && (
          <div className="searchable-select-wrapper__error">
            { meta.error }
          </div>
        ) }
      </React.Fragment>
    );
  }
}

export default SearchableSelect;
