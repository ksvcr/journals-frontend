import React from 'react';
import classNames from 'classnames';

import './point-menu-button.scss';

const PointMenuButton = function (props) {
  const buttonClasses = classNames('point-menu-button', props.className);

  function handleClick() {
    if (props.onClick) {
      props.onClick(props.index);
    }
  }

  return (
    <button type="button" className={ buttonClasses } onClick={ handleClick } >
      <span className="point-menu-button__holder">
        <i className="point-menu-button__icon" />
      </span>
    </button>
  );
};

export default PointMenuButton;
