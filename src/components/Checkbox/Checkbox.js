import React from 'react';
import classNames from 'classnames';

import Icon from '~/components/Icon/Icon';

import './checkbox.scss';
import './assets/checkbox.svg';

const Checkbox = (props) => {
  const { children, meta, input, className, ...rest } = props;
  const checkboxClasses = classNames('checkbox', className);
  return (
    <label className={ checkboxClasses }>
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
