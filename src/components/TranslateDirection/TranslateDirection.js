import React from 'react';

import Icon from '~/components/Icon/Icon';

import './translate-direction.scss';
import './assets/direction.svg';

const TranslateDirection = ({ language }) => {
  const fromLang = language;
  const toLang = fromLang === 'en' ? 'ru' : 'en';
  return (
    <div className="translate-direction">
      <span className="translate-direction__label"> { fromLang } </span>
      <Icon name="direction" className="translate-direction__icon"/>
      <span className="translate-direction__label"> { toLang } </span>
    </div>
  );
};

export default TranslateDirection;



