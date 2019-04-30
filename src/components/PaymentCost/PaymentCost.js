import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class PaymentCost extends PureComponent {
  render() {
    const { cost } = this.props;
    return (
      <div className="payment-cost">
        Стоимость публикации статьи в выбранном журнале составляет <b>{ cost || 0 } руб</b>
      </div>
    );
  }
}

PaymentCost.propTypes = {
  cost: PropTypes.number
};

export default PaymentCost;
