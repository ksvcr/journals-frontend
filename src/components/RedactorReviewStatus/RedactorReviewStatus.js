import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import './redactor-review-status.scss';

class RedactorReviewStatus extends Component {
  render() {
    const { stage, isShowReviewerList, onSelfInvite, t } = this.props;
    return (
      <div className="redactor-review-status">
        <div className="redactor-review-status__text">
          { stage === 'REVISION' ?
            t('article_on_revision') :
            t('reviewer_is_not_assigned') }
        </div>
        { isShowReviewerList &&
          <button type="button" className="redactor-review-status__button" onClick={ onSelfInvite }>
            { t('assign_yourself') }
          </button>
        }
      </div>
    );
  }
}

RedactorReviewStatus.propTypes = {
  stage: PropTypes.string,
  isShowReviewerList: PropTypes.bool,
  onSelfInvite: PropTypes.func
};

RedactorReviewStatus = withNamespaces()(RedactorReviewStatus);

export default RedactorReviewStatus;
