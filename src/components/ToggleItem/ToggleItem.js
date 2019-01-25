import React, { Component } from 'react';
import classNames from 'classnames';

import Icon from '~/components/Icon/Icon';

import './assets/arrow.svg';
import './toggle-item.scss';

class ToggleItem extends Component {
  state = {
    isOpen: false
  };

  handleToggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  handleContentClick = (event) => {
    event.stopPropagation();
  };

  render() {
    const { title, className } = this.props;
    const { isOpen } = this.state;
    const classes = classNames('toggle-item', className, {
      'toggle-item_opened': isOpen,
    });

    return (
      <div className={ classes } onClick={ this.handleToggle }>
        <div className="toggle-item__head">
          <div className="toggle-item__title">
            { title }
          </div>
          <Icon name="arrow" className="toggle-item__arrow" />
        </div>
        <div className="toggle-item__content" onClick={ this.handleContentClick }>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default ToggleItem;
