import React from 'react';
import PropTypes from 'prop-types';

import getArticleStatusTitle from '~/services/getArticleStatusTitle';
import getStatusColor from '~/services/getStatusColor';

import './status-label.scss';

const StatusLabel = ({ status }) => {
  const style = { color: getStatusColor(status) };
  return (
    <div className="status-label" style={ style }>
      { getArticleStatusTitle(status) }
    </div>
  );
};

StatusLabel.propTypes = {
  status: PropTypes.string.isRequired
};

export default StatusLabel;
