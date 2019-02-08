import React, { Component } from 'react';

import ReviewsHistory from '~/components/ReviewsHistory/ReviewsHistory';

class ContentReviews extends Component {
  render() {
    const { reviews, author } = this.props;

    return (
      <div className="content-reviews">
        <ReviewsHistory reviews={ reviews } author={ author } />
      </div>
    );
  }
}

export default ContentReviews;
