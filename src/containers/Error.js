import React, { Component } from 'react';

class Error extends Component {
  render() {
    const { text } = this.props;
    return (
      <article className="page__content">
        <h2 className="page__title"> Ошибка </h2>
        <p>{ text }</p>
      </article>
    );
  }
}

export default Error;
