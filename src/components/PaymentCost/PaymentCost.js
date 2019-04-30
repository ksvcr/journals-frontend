import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

class PaymentCost extends PureComponent {
  render() {
    const { t, cost } = this.props;
    return (
      <div className="payment-cost">
        { t('publication_cost') } <b>{ cost || 0 } { t('rub') }</b>
      </div>
    );
  }
}

PaymentCost.propTypes = {
  cost: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

PaymentCost = withNamespaces()(PaymentCost);

export default PaymentCost;
