import React from 'react';

import './radio.scss';

const Radio = (props) => {
  const { name, label } = props;
  return (
    <label className="radio">
      <input type="radio" name={ name } className="radio__input"/>
      <span className="radio__title">
        { label }
      </span>
    </label>
  )
}

export default Radio;
