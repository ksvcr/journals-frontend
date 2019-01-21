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
    if (!inputValue) {
      return [];
    }
    const { onLoadOptions } = this.props;
    onLoadOptions(inputValue);
  };

  handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };

  getOptionValue = (option) => option.id;
  getOptionLabel = (option) => option.name;
  noOptionsMessage = () => 'Ничего не найдено';
  loadingMessage = () => 'Поиск...';

  render() {
    const { defaultOptions, placeholder } = this.props;
    const { selectedOption } = this.state;
    const classes = classNames('searchable-select-wrapper searchable-select-wrapper_white');

    return (
      <AsyncSelect
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
    );
  }
}

export default SearchableSelect;
