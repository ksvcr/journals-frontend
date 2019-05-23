import React from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import './stats-counter.scss';

const propTypes = {
  counter: PropTypes.number
};
const defaultProps = {
  counter: 0
};

const StatsCounter = ({ counter, t }) => {
  return (
    <div className="stats-counter">
      <div className="stats-counter__label">{ t('total_characters') }:</div>
      <div className="stats-counter__value">
        <b>{ counter.toLocaleString() }</b>
        <small>({ t('no_spaces') })</small>
      </div>
    </div>
  );
};

StatsCounter.propTypes = propTypes;
StatsCounter.defaultProps = defaultProps;

export default withNamespaces()(StatsCounter);
