import React, { Component } from 'react';
import { connect } from 'react-redux';

import DiscountsDescription from '~/components/DiscountsDescription/DiscountsDescription';
import DiscountsBalance from '~/components/DiscountsBalance/DiscountsBalance';
import DiscountsHistory from '~/components/DiscountsHistory/DiscountsHistory';
import { withNamespaces } from 'react-i18next';


import * as discountsActions from '~/store/discounts/actions';
import { getIncomingOperations, getOutcomingOperations } from '~/store/discounts/selector';
import { getUserData } from '~/store/user/selector';

class Discounts extends Component {
  componentDidMount() {
    const { fetchDiscounts, userId } = this.props;
    fetchDiscounts(userId);
  }

  render() {
    const { t, balance, incomingOperations, outcomingOperations } = this.props;

    return (
      <React.Fragment>
        <h1 className="page__title">{ t('my_discounts') }</h1>
        <DiscountsDescription />
        <hr className="page__divider"/>
        <DiscountsBalance balance={ balance } />
        <DiscountsHistory incomingOperations={ incomingOperations } outcomingOperations={ outcomingOperations } />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { discounts } = state;
  const { balance } = discounts;
  const { id:userId } = getUserData(state);

  return {
    userId,
    balance,
    incomingOperations: getIncomingOperations(state),
    outcomingOperations: getOutcomingOperations(state)
  };
}

const mapDispatchToProps = {
  fetchDiscounts: discountsActions.fetchDiscounts
};

Discounts = withNamespaces()(Discounts);


export default connect(mapStateToProps, mapDispatchToProps)(Discounts);
