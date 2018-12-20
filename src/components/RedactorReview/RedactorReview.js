import React, { Component } from 'react';

import RedactorReviewerList from '~/components/RedactorReviewerList/RedactorReviewerList';

class RedactorReview extends Component {
  render() {
    const { articleId } = this.props;
    return (
      <div className="redactor-review">
        <RedactorReviewerList articleId={ articleId } />
      </div>
    );
  }
}

export default RedactorReview;
