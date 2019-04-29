import React, { Component } from 'react';
import classNames from 'classnames';

import './point-menu-button.scss';

class PointMenuButton extends Component {
  handleClick = () => {
    const { onClick, id } = this.props;
    if (onClick) {
      onClick(id);
    }
  };

  render() {
    const buttonClasses = classNames('point-menu-button', this.props.className);

    return (
      <button
        type="button"
        className={ buttonClasses }
        onClick={ this.handleClick }
      >
        <span className="point-menu-button__holder">
          <i className="point-menu-button__icon" />
        </span>
      </button>
    );
  }
}

export default PointMenuButton;
