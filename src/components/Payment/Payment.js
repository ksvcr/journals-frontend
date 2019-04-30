import React, { Component } from 'react';
import { connect } from 'react-redux';

import Icon from '~/components/Icon/Icon';
import PaymentBalance from '~/components/PaymentBalance/PaymentBalance';
import PaymentCost from '~/components/PaymentCost/PaymentCost';
import PaymentRequisites from '~/components/PaymentRequisites/PaymentRequisites';

import * as userActions from '~/store/user/actions';

import './payment.scss';
import './assets/cancel.svg';
import { withNamespaces } from 'react-i18next';

class Payment extends Component {
  state = {
    discountValue: ''
  };

  componentDidMount () {
    const { dispatch } = this.props;
    // Fetch for update balance
    dispatch(userActions.fetchCurrentUser());
  }

  handleValueChange = (event) => {
    let { value } = event.target;
    value = parseInt(value, 10);
    const { user, data } = this.props;
    const { balance } = user.data;

    if (value <= data.cost_without_discounts && value <= balance) {
      this.setState({ discountValue: value });
    }
  };

  render() {
    const { onClose, data, user, t } = this.props;
    const { discountValue } = this.state;
    const { balance } = user.data;
    return (
      <div className="payment">
        <div className="payment__head">
          <h2 className="payment__title">
            { t('payment') }
          </h2>
          <button type="button" className="payment__close" onClick={ onClose }>
            { t('cancel') }
            <Icon name="cancel" className="payment__close__icon" />
          </button>
        </div>
        <div className="payment__body">
          <div className="payment__body__cost">
            <PaymentCost cost={ data.cost_without_discounts } />
          </div>
          { balance > 0 &&
            <div className="payment__body__balance">
              <PaymentBalance
                balance={ balance }
                value={ discountValue }
                onChange={ this.handleValueChange } />
            </div>
          }
        </div>
        <div className="payment__result">
          <h2 className="payment__title">
            { t('total_cost') }:
          </h2>
          <span className="payment__total">
            { data.cost_without_discounts - discountValue || 0 } { t('rub') }.
          </span>
        </div>
        <hr className="payment__divider" />
        <PaymentRequisites />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;

  return {
    user
  };
}

Payment = withNamespaces()(Payment);

export default connect(mapStateToProps)(Payment);
