import React from 'react';
import Icon from '~/components/Icon/Icon';

import './assets/file.svg';
import './file-drop-placeholder.scss';

const FileDropPlaceholder = () => {
  return (
    <div className="file-drop-placeholder">
      <div className="file-drop-placeholder__holder">
        <Icon name="file" className="file-drop-placeholder__icon" />
        <div className="file-drop-placeholder__info">
          <div className="file-drop-placeholder__title">
            Перетащите сюда файлы или <span className="file-drop-placeholder__pseudolink">кликните для загрузки</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDropPlaceholder;
