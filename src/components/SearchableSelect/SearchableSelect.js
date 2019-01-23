import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import classNames from 'classnames';
import { debounce } from 'throttle-debounce';

import './searchable-select.scss';

class SearchableSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: props.defaultValue,
    };
  }

  handleChange = (selectedOption) => {
    const { input } = this.props;

    this.setState({
      selectedOption: selectedOption
    });
    input.onChange(selectedOption.id);
  };

  getOptions = (inputValue, callback) => {
    const { onLoadOptions } = this.props;

    if (!inputValue) {
      return [];
    }

    return onLoadOptions(inputValue)
      .then(response => {
        callback(response.results);
      });
  };

  getOptionValue = (option) => option.id;
  getOptionLabel = (option) => option.name;
  noOptionsMessage = () => 'Ничего не найдено';
  loadingMessage = () => 'Поиск...';

  render() {
    const { meta, id, required, defaultOptions, placeholder } = this.props;
    const { selectedOption } = this.state;
    const hasError = meta && meta.submitFailed && meta.error;
    const classes = classNames('searchable-select-wrapper searchable-select-wrapper_white',
      { 'searchable-select-wrapper_error': hasError });

    return (
      <React.Fragment>
        <AsyncSelect
          id={ id } required={ required }
          className={ classes }
          classNamePrefix="searchable-select"
          cacheOptions
          value={ selectedOption }
          placeholder={placeholder}
          noOptionsMessage={this.noOptionsMessage}
          loadingMessage={this.loadingMessage}
          getOptionValue={this.getOptionValue}
          getOptionLabel={this.getOptionLabel}
          defaultOptions={defaultOptions}
          loadOptions={ debounce(500, this.getOptions) }
          onChange={this.handleChange}
        />
        { hasError &&
          <div className="searchable-select-wrapper__error">
            { meta.error }
          </div>
        }
      </React.Fragment>
    );
  }
}

export default SearchableSelect;
