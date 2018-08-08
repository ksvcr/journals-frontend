import React from 'react';

import './radio.scss';

const Radio = (props) => {
  const { name, label, checked } = props;
  return (
    <label className="radio">
      <input type="radio" name={ name } checked={ checked } className="radio__input"/>
      <span className="radio__title">
        { label }
      </span>
    </label>
  )
}

export default Radio;
