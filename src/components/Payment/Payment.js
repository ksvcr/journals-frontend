import React, {Component} from 'react';
import './payment.scss';

class Payment extends Component {
  render() {
    const { onClose } = this.props;
    return (
      <div className="payment">
        <div className="payment__head">
          <h2 className="payment__title">
            Оплата
          </h2>
          <button type="button" className="payment__close" onClick={ onClose }>
            Закрыть
          </button>
        </div>
      </div>
    );
  }
}

export default Payment;
