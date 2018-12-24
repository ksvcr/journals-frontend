import React, { Component } from 'react';

class Error extends Component {
  render() {
    const { text } = this.props;
    return (
      <React.Fragment>
        <h2 className="page__title"> Ошибка </h2>
        <p>{ text }</p>
      </React.Fragment>
    );
  }
}

export default Error;
