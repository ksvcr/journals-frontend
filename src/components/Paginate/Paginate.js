import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './paginate.scss';

class Paginate extends Component {
  render() {
    const { size } = this.props;

    return (
      <div className="paginate">
        <button type="button" className="paginate__button paginate__button_start">
          В начало
        </button>
        <button type="button" className="paginate__button paginate__button_prev">
          Назад
        </button>

        <div className="paginate__holder">
          <input type="text" className="paginate__input" />
          <span className="paginate__total"> из { size } </span>
        </div>

        <button type="button" className="paginate__button paginate__button_next">
          Вперед
        </button>
        <button type="button" className="paginate__button paginate__button_end">
          В Конец
        </button>
      </div>
    );
  }
}

Paginate.propTypes = {
  size: PropTypes.number.isRequired
};

export default Paginate;
