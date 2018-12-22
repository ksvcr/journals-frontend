import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './redactor-review-status.scss';

class RedactorReviewStatus extends Component {
  render() {
    const { stage, isShowReviewerList, onSelfInvite } = this.props;
    return (
      <div className="redactor-review-status">
        <div className="redactor-review-status__text">
          { stage === 'REVISION' ?
            'Статья находится на рецензировании' :
            'Рецензент для статьи пока не назначен' }
        </div>
        { isShowReviewerList &&
          <button type="button" className="redactor-review-status__button" onClick={ onSelfInvite }>
            Назначить себя
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

export default RedactorReviewStatus;
