import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './button.scss';

class Button extends Component {
  handleClick = (event) => {
    const { onClick } = this.props;

    if (onClick) {
      onClick(event);
    }
  };

  render() {
    const { type, href, className, children } = this.props;
    const buttonClasses = classNames('button', className);

    if (type === 'link') {
      return (
        <Link to={ href } className={ buttonClasses }>
          { children }
        </Link>
      );
    } else {
      return (
        <button type={ type } className={ buttonClasses } onClick={ this.handleClick }>
          { children }
        </button>
      );
    }
  }
}

Button.defaultProps = {
  type: 'button',
  href: '/'
};

Button.propTypes = {
  type: PropTypes.string,
  href: PropTypes.string
};

export default Button;
