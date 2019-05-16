import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './menu.scss';

class Menu extends Component {
  renderItems = () => {
    const { items } = this.props;
    return items.map((item, index) => {
      return (
        <li className="menu__item" key={ `item-${index}` }>
          { item.href ?
            (
              item.native ?
                <a href={ item.href } className="menu__link">
                  { item.title }
                </a> :
                <NavLink to={ item.href } className="menu__link"
                         exact activeClassName="menu__link_active">
                  { item.title }
                </NavLink>
            ) :
                <button type="button" className="menu__link" onClick={ item.handler }>
                  { item.title }
                </button>
          }
        </li>
      )});
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
