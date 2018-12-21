import React, { Component } from 'react';
import { connect } from 'react-redux';
import DiscountsDescription from '~/components/DiscountsDescription/DiscountsDescription';
import DiscountsBalance from '~/components/DiscountsBalance/DiscountsBalance';

class Discounts extends Component {
  render() {
    return (
      <article className="page__content">
        <h1 className="page__title">Мои скидки</h1>
        <DiscountsDescription />
        <hr className="page__divider"/>
        <DiscountsBalance balance={ 10000 } />
      </article>
    );
  }
}

export default connect()(Discounts);
