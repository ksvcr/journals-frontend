import React from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import TextField from '~/components/TextField/TextField';

import './payment-balance.scss';

const PaymentBalance = ({ t, balance, value, onChange }) => {
  return (
    <div className="payment-balance">
      <h3 className="payment-balance__balance">
        { t('your_discount_balance') }: { balance } { t('rub') }.
      </h3>
      <div className="form__field">
        <label htmlFor="payment_value" className="form__label payment-balance__label">
          { t('charge_for_payment') } ({ t('rub') })
        </label>
        <TextField id="payment_value" type="number"
                   className="payment-balance__input text-field_small" value={ value } onChange={ onChange } />
      </div>
    </div>
  );
};

PaymentBalance.propTypes = {
  balance: PropTypes.number.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired
};

export default withNamespaces()(PaymentBalance);
