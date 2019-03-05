import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '~/components/Button/Button';
import Icon from '~/components/Icon/Icon';

import './discounts-transfer-select.scss';
import './assets/arrow_right.svg';

class DiscountsTransferSelect extends Component {
  handleItemSelect = (event) => {
    const { id } = event.currentTarget.dataset;
    const { onSelect } = this.props;
    onSelect(parseInt(id, 10));
  };

  renderItems = () => {
    const { items } = this.props;

    return items.map((item, index) => (
      <li key={ index } className="discounts-transfer-select__item">
        <div className="discounts-transfer-select__item__infobox">
          <p className="discounts-transfer-select__item__fullname">
            <b>{ item.last_name }</b> { item.first_name } { item.middle_name }
          </p>
          <p className="discounts-transfer-select__item__info">
            { /* TODO: Заменить на реальные данные */ }
            НИИ УХИМВАДЕ, Екатеринбург, Россия
          </p>
        </div>
        <div className="discounts-transfer-select__item__actions">
          <Button className="discounts-transfer-select__item__button button_small"
                  data-id={ item.id } onClick={ this.handleItemSelect }>
            Выбрать
            <Icon className="discounts-transfer-select__item__button__icon" name="arrow_right" />
          </Button>
        </div>
      </li>
    ));
  };

  render() {
    return (
      <ul className="discounts-transfer-select">
        { this.renderItems() }
      </ul>
    );
  }
}

DiscountsTransferSelect.propTypes = {
  onSelect: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
};

export default DiscountsTransferSelect;
