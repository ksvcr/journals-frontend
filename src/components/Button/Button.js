import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './button.scss';

class Button extends Component {
  render() {
    const { type, href, className, children, ...rest } = this.props;
    const buttonClasses = classNames('button', className);

    if (type === 'link') {
      return (
        <Link to={ href } className={ buttonClasses } { ...rest }>
          { children }
        </Link>
      );
    } else {
      return (
        <button type={ type } className={ buttonClasses } { ...rest }>
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
