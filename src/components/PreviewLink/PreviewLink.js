import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '~/components/Icon/Icon';

import './preview-link.scss';
import './assets/preview.svg';

const PreviewLink = ({ text, href }) => {
  return (
    <Link className="preview-link" to={ href }>
      { text }
      <Icon name="preview" className="preview-link__icon " />
    </Link>
  );
};

PreviewLink.defaultProps = {
  text: 'Предпросмотр',
  href: '/'
};

PreviewLink.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string
};

export default PreviewLink;
