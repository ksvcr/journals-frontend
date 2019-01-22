import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import classNames from 'classnames';

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

  getOptions = (inputValue) => {
    console.log('getOptions');
    if (!inputValue) {
      return [];
    }
    const { onLoadOptions } = this.props;

    return new Promise((resolve, reject) => {
      onLoadOptions(inputValue)
        .then(response => {
          resolve(response.results);
        }).catch(reject);
    }).catch((error) => console.log(error));
  };

  handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    console.log('input change');
    return inputValue;
  };

  getOptionValue = (option) => option.id;
  getOptionLabel = (option) => option.name;
  noOptionsMessage = () => 'Ничего не найдено';
  loadingMessage = () => 'Поиск...';

  render() {
    const { meta, id, required, defaultOptions, placeholder } = this.props;
    const { selectedOption } = this.state;
    const classes = classNames('searchable-select-wrapper searchable-select-wrapper_white',
      { 'searchable-select-wrapper_error': meta && meta.submitFailed && meta.error });

    const hasError = meta && meta.submitFailed && meta.error;

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
          loadOptions={this.getOptions}
          onChange={this.handleChange}
          onInputChange={this.handleInputChange}
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
