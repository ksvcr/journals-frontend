import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './menu.scss';

class Menu extends Component {
  renderItems = () => {
    const { items } = this.props;
    return items.map((item, index) => (
      <li className="menu__item" key={ `item-${index}` }>
        <Link to="/" className="menu__link">
          { item.title }
        </Link>
      </li>
    ));
  };

  render() {
    return (
      <nav className="menu">
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
