import React from 'react';

import Icon from '~/components/Icon/Icon';

import './checkbox.scss';
import './assets/checkbox.svg';

const Checkbox = (props) => {
  const { children, meta, input, ...rest } = props;
  return (
    <label className="checkbox">
      <input type="checkbox" className="checkbox__input" { ...input } { ...rest } />
      <span className="checkbox__icon">
        <Icon className="checkbox__image" name="checkbox" />
      </span>
      <span className="checkbox__title">
        { children }
      </span>
    </label>
  )
};

export default Checkbox;
