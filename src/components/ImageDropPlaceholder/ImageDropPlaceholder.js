import React from 'react';
import Icon from '~/components/Icon/Icon';

import './assets/picture.svg';
import './image-drop-placeholder.scss';

const ImageDropPlaceholder = () => {
  return (
    <div className="image-drop-placeholder">
      <div className="image-drop-placeholder__holder">
        <Icon name="picture" className="image-drop-placeholder__icon" />
        <div className="image-drop-placeholder__info">
          <div className="image-drop-placeholder__title">
            Перетащите сюда изображения или <span className="image-drop-placeholder__pseudolink">кликните для загрузки</span>
          </div>
          <div className="image-drop-placeholder__text">
            Максимальный размер файла 10 Мб, разрешение не менее 300 dpi
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDropPlaceholder;
