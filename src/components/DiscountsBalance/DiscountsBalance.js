import React from 'react';

import './discounts-balance.scss';

const DiscountsBalance = ({ balance = 0 }) => {
  const balanceText = Number.isInteger(balance) ? balance.toLocaleString() : balance;
  return (
    <div className="discounts-balance">
      <h3 className="discounts-balance__text">
        Баланс (руб): <span className="discounts-balance__value">{ balanceText }</span>
      </h3>
      <a className="discounts-balance__transfer" href="#transfer">
        Передать другому пользователю
      </a>
    </div>
  )
}

export default DiscountsBalance;
