import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '~/components/Icon/Icon';

import './tools-menu.scss';
import './assets/preview.svg';

class ToolsMenu extends Component {
  handleClick = (event) => {
    const { index } = event.currentTarget.dataset;
    const { id, items } = this.props;
    const item = items[index];
    if (item && item.handler) {
      item.handler(id);
    }
  };

  renderItems = () => {
    const { items } = this.props;
    return items.map((item, index) => {
      const toolItemClass = classNames('tools-menu__item', { [`tools-menu__item_${item.type}`]: item.type });
      return (
        <li className={ toolItemClass } key={ index } >
          <button className="tools-menu__button" type="button" data-index={ index } onClick={ this.handleClick }>
            <React.Fragment>
              { item.icon &&
                <Icon className="tools-menu__icon" name={ item.icon } />
              }
              { item.title }
            </React.Fragment>
          </button>
        </li>
      );
    });
  };

  render() {
    return (
      <div className="tools-menu">
        <ul className="tools-menu__list">
          { this.renderItems() }
        </ul>
      </div>
    );
  }
}

ToolsMenu.propTypes = {
  items: PropTypes.array.isRequired
};

export default ToolsMenu;
