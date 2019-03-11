import React from 'react';
// import PropTypes from 'prop-types';
import './stats-counter.scss';

const propTypes = {};
const defaultProps = {};

const StatsCounter = () => {
  return (
    <div className="stats-counter">
      <div className="stats-counter__label">всего знаков:</div>
      <div className="stats-counter__value">
        <b>3 250</b>
        <small>(без пробелов)</small>
      </div>
    </div>
  );
};

StatsCounter.propTypes = propTypes;
StatsCounter.defaultProps = defaultProps;

export default StatsCounter;
