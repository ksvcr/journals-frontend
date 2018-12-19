import React, { Component } from 'react';

import RedactorReviewerList from '~/components/RedactorReviewerList/RedactorReviewerList';

class RedactorReview extends Component {
  render() {
    return (
      <div className="redactor-review">
        <RedactorReviewerList />
      </div>
    );
  }
}

export default RedactorReview;
