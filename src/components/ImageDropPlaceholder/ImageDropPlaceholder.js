import React from 'react';
import { withNamespaces } from 'react-i18next';

import Icon from '~/components/Icon/Icon';

import './assets/picture.svg';
import './image-drop-placeholder.scss';

const ImageDropPlaceholder = ({ t }) => {
  return (
    <div className="image-drop-placeholder">
      <div className="image-drop-placeholder__holder">
        <Icon name="picture" className="image-drop-placeholder__icon" />
        <div className="image-drop-placeholder__info">
          <div className="image-drop-placeholder__title">
            { t('drop_files_or') } <span className="image-drop-placeholder__pseudolink">{ t('click_to_download') }</span>
          </div>
          <div className="image-drop-placeholder__text">
            { t('image_max_size') }
          </div>
        </div>
      </div>
    </div>
  );
};

export default withNamespaces()(ImageDropPlaceholder);
