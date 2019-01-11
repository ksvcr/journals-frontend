import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from '~/components/Icon/Icon';
import * as formatDate from '~/services/formatDate';

import './deadline-label.scss';
import './assets/clock.svg';

class DeadlineLabel extends Component {
  render() {
    const { date } = this.props;
    return (
      <div className="deadline-label">
        <Icon className="deadline-label__icon" name="clock" />
        <div className="deadline-label__text">
          { `До ${formatDate.toString(date)}` }
        </div>
      </div>
    );
  }
}

DeadlineLabel.propTypes = {
  date: PropTypes.string.isRequired
};

export default DeadlineLabel;
