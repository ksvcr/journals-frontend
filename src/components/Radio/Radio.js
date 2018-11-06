import React from 'react';

import './radio.scss';

const Radio = (props) => {
  const { children, meta, input, ...rest } = props;

  return (
    <label className="radio">
      <input type="radio" className="radio__input" { ...input } { ...rest } />
      <span className="radio__title">
        { children }
      </span>
    </label>
  )
};

export default Radio;
