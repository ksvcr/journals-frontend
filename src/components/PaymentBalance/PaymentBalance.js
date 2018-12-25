import React from 'react';
import PropTypes from 'prop-types';

import TextField from '~/components/TextField/TextField';

import './payment-balance.scss';

const PaymentBalance = ({ balance, ...rest }) => {
  return (
    <div className="payment-balance">
      <h3 className="payment-balance__balance">
        Ваш скидочный баланс: { balance } руб.
      </h3>
      <div className="form__field">
        <label htmlFor="payment_value" className="form__label payment-balance__label">
          Списать для оплаты статьи (руб)
        </label>
        <TextField id="payment_value" type="number"
                    className="payment-balance__input text-field_small" { ...rest } />
      </div>
    </div>
  );
};

PaymentBalance.propTypes = {
  balance: PropTypes.number.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default PaymentBalance;
