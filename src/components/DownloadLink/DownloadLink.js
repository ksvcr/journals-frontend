import React from 'react';
import PropTypes from 'prop-types';

import Icon from '~/components/Icon/Icon';

import getFileExtension from '~/utils/getFileExtension';
import formatBytes from '~/utils/formatBytes';

import './download-link.scss';
import './assets/download.svg';

const DownloadLink = ({ file, size, title }) => {
  const sizeString = size ? `${formatBytes(size)}, ` : '';
  return (
    <a href={ file } className="download-link">
      <span className="download-link__title">
        <Icon className="download-link__icon" name="download" />
        { title ? title: file }
      </span>
      <span className="download-link__info">
        { sizeString }{ getFileExtension(file) || 'неизвестно' }
      </span>
    </a>
  );
};

DownloadLink.propTypes = {
  size: PropTypes.number,
  title: PropTypes.string,
  file: PropTypes.string.isRequired
};

export default DownloadLink;
