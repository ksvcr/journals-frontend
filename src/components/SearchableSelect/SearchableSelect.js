import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';

class SearchableSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: props.defaultValue,
    };
  }

  getOptionValue = (option) => option.id;
  getOptionLabel = (option) => option.name;

  handleChange = (selectedOption, {action}) => {
    const { input } = this.props;

    this.setState({
      selectedOption: selectedOption
    });
    input.onChange(selectedOption.id);
  }

  getOptions = (inputValue) => {
    console.log('get options', inputValue);
    if (!inputValue) {
      return [];
    }

    const { onLoadOptions } = this.props;
    onLoadOptions(inputValue);
  }

  noOptionsMessage = () => {
    return 'Ничего не найдено';
  }

  handleInputChange = (newValue) => {
    console.log('input change');
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };

  render() {
    const { defaultOptions, placeholder } = this.props;
    const { selectedOption } = this.state;
    console.log('render');

    return (
      <AsyncSelect
        cacheOptions
        value={selectedOption}
        noOptionsMessage={ this.noOptionsMessage }
        getOptionValue={this.getOptionValue}
        getOptionLabel={this.getOptionLabel}
        defaultOptions={defaultOptions}
        loadOptions={this.getOptions}
        placeholder={placeholder}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
      />
    );
  }
}

export default SearchableSelect;
