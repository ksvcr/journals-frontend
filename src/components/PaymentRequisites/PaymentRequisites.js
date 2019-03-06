import React, { PureComponent } from 'react';

import Icon from '~/components/Icon/Icon';

import './payment-requisites.scss';
import './assets/yandex_money.svg';
import './assets/qiwi.svg';

class PaymentRequisites extends PureComponent {
  get wallets() {
    return [
      {
        icon: 'yandex_money',
        number: '564767857685800'
      },
      {
        icon: 'qiwi',
        number: '8 904 567 67 88'
      }
    ];
  }

  renderWallets = () => {
    return this.wallets.map((item, index) => {
      return (
        <div key={ index } className="payment-requisites__wallet">
          <Icon className="payment-requisites__icon" name={ item.icon } />
          <span className="payment-requisites__number">{ item.number }</span>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="payment-requisites">
        <p className="payment-requisites__description">
          Оплатить данную сумму Вы можете по следующим реквизитам:
        </p>
        <div className="payment-requisites__wallets">
          { this.renderWallets() }
        </div>
        <p className="payment-requisites__warning">
          При оплате не забывайте указывать ваше имя и название публикации!
        </p>
      </div>
    );
  }
}

export default PaymentRequisites;
