import React from 'react';
import Icon from '~/components/Icon/Icon';
import { withNamespaces } from 'react-i18next';

import './assets/file.svg';
import './file-drop-placeholder.scss';

const FileDropPlaceholder = ({ t }) => {
  return (
    <div className="file-drop-placeholder">
      <div className="file-drop-placeholder__holder">
        <Icon name="file" className="file-drop-placeholder__icon" />
        <div className="file-drop-placeholder__info">
          <div className="file-drop-placeholder__title">
            { t('drop_files_or') } <span className="file-drop-placeholder__pseudolink">{ t('click_to_download') }</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withNamespaces()(FileDropPlaceholder);
