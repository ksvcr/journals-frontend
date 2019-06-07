import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';

import TextField from '~/components/TextField/TextField';

import './link-prompt.scss';

class LinkPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    }
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ value });
  };

  handleConfirm = (event) => {
    event.preventDefault();
    const { onConfirm } = this.props;
    const { value } = this.state;

    onConfirm(value);
  };

  render() {
    const { value } = this.state;
    const { t } = this.props;
    return (
      <form className="link-prompt" onSubmit={ this.handleConfirm }>
        <TextField onChange={ this.handleChange } value={ value } className="link-prompt__input" />
        <button className="link-prompt__button button button_small" type="submit">
          { t('save') }
        </button>
      </form>
    );
  }
}

LinkPrompt = withNamespaces()(LinkPrompt);

export default LinkPrompt;
