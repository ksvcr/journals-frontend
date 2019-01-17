import React, { Component } from 'react';

import ReviewsHistoryItem from '~/components/ReviewsHistoryItem/ReviewsHistoryItem';

import './reviews-history.scss';

class ReviewsHistory extends Component {
  renderList = () => {
    const { reviews } = this.props;
    return reviews.map((item, index) => <ReviewsHistoryItem key={ index } item={ item }/>);
  };

  render() {
    return (
      <div className="reviews-history">
        { this.renderList() }
      </div>
    );
  }
}

export default ReviewsHistory;
