import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '~/components/Icon/Icon';

import './cancel-link.scss';
import './assets/cancel.svg';

const CancelLink = ({ text, href, ...rest }) => {
  return (
    <Link className="cancel-link" to={ href } { ...rest }>
      <Icon name="cancel" className="cancel-link__icon " />
      { text }
    </Link>
  );
};

CancelLink.defaultProps = {
  text: 'Отмена',
  href: '/'
};

CancelLink.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string
};

export default CancelLink;
