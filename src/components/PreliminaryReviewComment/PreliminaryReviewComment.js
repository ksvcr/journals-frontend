import React from 'react';
import PropTypes from 'prop-types';

import './preliminary-review-comment.scss';

const PreliminaryReviewComment = ({ review }) => {
  return (
    <div className="preliminary-review-comment">
      <div className="preliminary-review-comment__title">
        Редактор
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

export default PreliminaryReviewComment;
