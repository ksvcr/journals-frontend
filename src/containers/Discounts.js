import React, { Component } from 'react';
import { connect } from 'react-redux';

class Discounts extends Component {
  render() {
    return (
      <article className="page__content">
        <h1 className="page__title">Мои скидки</h1>
      </article>
    );
  }
}

export default connect()(Discounts);
