import React, { Component } from 'react';
import { connect } from 'react-redux';

import Icon from '~/components/Icon/Icon';
import PaymentBalance from '~/components/PaymentBalance/PaymentBalance';
import PaymentCost from '~/components/PaymentCost/PaymentCost';
import PaymentRequisites from '~/components/PaymentRequisites/PaymentRequisites';

import * as userActions from '~/store/user/actions';

import './payment.scss';
import './assets/cancel.svg';

class Payment extends Component {
  state = {
    value: ''
  };

  componentDidMount () {
    const { dispatch } = this.props;
    // Fetch for update balance
    dispatch(userActions.fetchCurrentUser());
  }

  handleValueChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { onClose, user } = this.props;
    const { value } = this.state;

    return (
      <div className="payment">
        <div className="payment__head">
          <h2 className="payment__title">
            Оплата
          </h2>
          <button type="button" className="payment__close" onClick={ onClose }>
            Отмена
            <Icon name="cancel" className="payment__close__icon" />
          </button>
        </div>
        <div className="payment__body">
          <div className="payment__body__cost">
            <PaymentCost cost={ 100 } />
          </div>
          <div className="payment__body__balance">
            <PaymentBalance
              balance={ user.data.balance }
              value={ value }
              onChange={ this.handleValueChange } />
          </div>
        </div>
        <div className="payment__result">
          <h2 className="payment__title">
            Итого к оплате:
          </h2>
          <span className="payment__total">
            5 000 руб.
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

export default connect(mapStateToProps)(Payment);
