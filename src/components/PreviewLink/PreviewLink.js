import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

import Icon from '~/components/Icon/Icon';

import './preview-link.scss';
import './assets/preview.svg';

const PreviewLink = ({ href, t }) => {
  return (
    <Link className="preview-link" to={ href }>
      { t('preview') }
      <Icon name="preview" className="preview-link__icon " />
    </Link>
  );
};

PreviewLink.defaultProps = {
  href: '/'
};

PreviewLink.propTypes = {
  href: PropTypes.string
};

export default withNamespaces()(PreviewLink);
