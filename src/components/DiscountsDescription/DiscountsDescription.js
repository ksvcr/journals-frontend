import React, { PureComponent } from 'react';

import './discounts-description.scss';

class DiscountsDescription extends PureComponent {
  render() {
    return (
      <p className="discounts-description">
        Скидки на публикации могут быть предоставлены Вам другими пользователями.
        Вы можете использовать их для оплаты собственных публикаций в наших изданиях, либо передать другим авторам, зарегистрированным в системе.
      </p>
    );
  }
}

export default DiscountsDescription;
