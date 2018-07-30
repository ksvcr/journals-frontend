import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './button.scss';

const Button = function (props) {
  const { type, href } = props;
  const classes = classNames('button', props.className);

  function handleClick(event) {
    if (props.onClick) {
      props.onClick(event);
    }
  }

  if (type === 'link') {
    return (
      <Link to={ href } className={ classes }>
        { props.children }
      </Link>
    );
  } else {
    return (
      <button type={ type } className={ classes } onClick={ handleClick }>
        { props.children }
      </button>
    );
  }
};

Button.defaultProps = {
  type: 'button',
  href: '/'
};

Button.propTypes = {
  type: PropTypes.string,
  href: PropTypes.string
};

export default Button;
