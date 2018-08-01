import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './menu.scss';

class Menu extends Component {
  renderItems = () => {
    const { items } = this.props;
    return items.map((item, index) => (
      <li className="menu__item" key={ `item-${index}` }>
        <Link to={ item.href ? item.href : '/' } className="menu__link">
          { item.title }
        </Link>
      </li>
    ));
  };

  render() {
    const { type } = this.props;
    const menuClasses = classNames('menu', { [`menu_${type}`] : type });
    return (
      <nav className={ menuClasses }>
        <ul className="menu__list">
          { this.renderItems() }
        </ul>
      </nav>
    );
  }
}

Menu.propTypes = {
  items: PropTypes.array.isRequired
};

export default Menu;
