import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import Icon from '~/components/Icon/Icon';
import * as formatDate from '~/services/formatDate';

import './deadline-label.scss';
import './assets/clock.svg';

class DeadlineLabel extends Component {
  render() {
    const { date, t } = this.props;
    return (
      <div className="deadline-label">
        <Icon className="deadline-label__icon" name="clock" />
        <div className="deadline-label__text">
          { `${ t('until') } ${formatDate.toString(date)}` }
        </div>
      </div>
    );
  }
}

DeadlineLabel.propTypes = {
  date: PropTypes.string.isRequired
};

DeadlineLabel = withNamespaces()(DeadlineLabel);

export default DeadlineLabel;
