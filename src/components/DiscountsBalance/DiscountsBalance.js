import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import DiscountsTransfer from '~/components/DiscountsTransfer/DiscountsTransfer';

import './discounts-balance.scss';

class DiscountsBalance extends Component {
  state = {
    showTransfer: false
  };

  get balanceText() {
    const { balance } = this.props;
    return balance.toLocaleString();
  }

  handleTrasnferClick = (event) => {
    event.preventDefault();
    this.setState({ showTransfer: true });
  };

  handleTransferClose = () => {
    this.setState({ showTransfer: false });
  };

  render() {
    const { showTransfer } = this.state;
    const { t } = this.props;
    return (
      <div className="discounts-balance">
        <h3 className="discounts-balance__text">
          Баланс (руб): <span className="discounts-balance__value">{ this.balanceText }</span>
        </h3>
        <a href="#transfer" className="discounts-balance__transfer" onClick={ this.handleTrasnferClick }>
          { t('give_to_another_user') }
        </a>
        {
          showTransfer &&
          <DiscountsTransfer onClose={ this.handleTransferClose } />
        }
      </div>
    )
  }
}

DiscountsBalance.propTypes = {
  balance: PropTypes.number.isRequired
};

DiscountsBalance = withNamespaces()(DiscountsBalance);

export default DiscountsBalance;
