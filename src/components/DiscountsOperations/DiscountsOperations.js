import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './discounts-operations.scss';

class DiscountsOperations extends Component {
  renderHeaderItems = () => {
    const items = ['Комментарий', 'Дата перечисления', 'Сумма (руб.)'];
    return items.map((item, index) => (
      <div key={ index } className="discounts-operations__header__item">
        { item }
      </div>
    ));
  };

  renderRows = () => {
    const { operations } = this.props;
    return operations.map((item, index) => {
      const amountText = Math.abs(item.amount);
      const dateText = moment(item.transfer_date).format('DD.MM.YYYY');
      return (
        <div key={ index } className="discounts-operations__row">
          <div className="discounts-operations__row__fullname">
            { item.comment }
          </div>
          <div className="discounts-operations__row__date">
            { dateText }
          </div>
          <div className="discounts-operations__row__value">
            { amountText }
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="discounts-operations">
        <div className="discounts-operations__header">
          { this.renderHeaderItems() }
        </div>
        <div className="discounts-operations__rows">
          { this.renderRows() }
        </div>
      </div>
    );
  }
}

DiscountsOperations.propTypes = {
  operations: PropTypes.array.isRequired
};

export default DiscountsOperations;
