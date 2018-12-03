import React, { Component } from 'react';
import './link-prompt.scss';
import TextField from '~/components/TextField/TextField';

class LinkPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ value });
  };

  handleConfirm = () => {
    const { onConfirm } = this.props;
    const { value } = this.state;

    onConfirm(value);
  };

  render() {
    const { value } = this.state;
    return (
      <div className="link-prompt">
        <TextField onChange={ this.handleChange } value={ value } className="link-prompt__input" />
        <button className="link-prompt__button button button_small" type="button" onClick={ this.handleConfirm }>
          Сохранить
        </button>
      </div>
    );
  }
}

export default LinkPrompt;
