import React from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import './preliminary-review-comment.scss';

const PreliminaryReviewComment = ({ review, t }) => {
  return (
    <div className="preliminary-review-comment">
      <div className="preliminary-review-comment__title">
        { t('redactor') }
      </div>
      <div className="preliminary-review-comment__text">
        { review }
      </div>
    </div>
  );
};

PreliminaryReviewComment.propTypes = {
  review: PropTypes.string.isRequired
};

export default withNamespaces()(PreliminaryReviewComment);
