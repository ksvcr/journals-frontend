import React, { Component } from 'react';
import Select, { components } from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { withNamespaces } from 'react-i18next';

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
  constructor(props) {
    super(props);
    const { loadOptions, async } = this.props;
    if (async) {
      this.loadOptions = debounce(loadOptions, 300);
    }
  }

  handleChange = selectedOption => {
    const { input = {} } = this.props;
    const onChange = input.onChange ? input.onChange : this.props.onChange;
    onChange(selectedOption);
  };

  handleBlur = () => {
    const { input = {} } = this.props;
    if (input.onBlur) {
      input.onBlur(input.value)
    }
  };

  get selectProps() {
    const { input = {}, meta, id, options, required, placeholder, className, t } = this.props;
    const hasError = meta && meta.submitFailed && meta.error;
    const wrapperClasses = classNames(
      'searchable-select-wrapper', className,
      { 'searchable-select-wrapper_error': hasError }
    );
    const value = input.value ? input.value : this.props.value;
    const props = {
      id,
      required,
      placeholder,
      options,
      value,
      components: { Option },
      className: wrapperClasses,
      classNamePrefix: 'searchable-select',
      noOptionsMessage: () => t('no_entries'),
      loadingMessage: () => `${ t('loading') }...`,
      getOptionValue: this.getOptionValue,
      getOptionLabel: this.getOptionLabel,
      onChange: this.handleChange,
      onBlur: this.handleBlur
    };

    if (this.loadOptions) {
      props.loadOptions = this.loadOptions;
    }

    return props;
  };

  render() {
    const { meta, async } = this.props;
    const hasError = meta && meta.submitFailed && meta.error;
    return (
      <React.Fragment>
        { async ? <AsyncSelect { ...this.selectProps } /> : <Select { ...this.selectProps } /> }

        { hasError && (
          <div className="searchable-select-wrapper__error">
            { meta.error }
          </div>
        ) }
      </React.Fragment>
    );
  }
}

export default withNamespaces()(SearchableSelect);
