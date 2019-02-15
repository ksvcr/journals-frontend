import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ReviewApprove extends Component {
  renderItems = () => {
    const { reviews, reviewInvites } = this.props;
    return reviews.map(review => {
      const invite = reviewInvites.find(item => review.invite === item.id);
      const { reviewer } = invite;
      return (
        <div className="review-approve__item" key={ review.id }>
          { `Включить рецензию ${ reviewer.first_name } ${ reviewer.last_name }` }
        </div>
      );
    });
  };

  render() {
    return (
      <div className="review-approve">
        { this.renderItems() }
      </div>
    );
  }
}

ReviewApprove.propTypes = {
  articleId: PropTypes.number
};

function mapStateToProps(state, props) {
  const { articles } = state;
  const { articleId } = props;

  const articleData = articles.data[articleId];

  return {
    reviewInvites: articleData ? articleData.reviewInvites : [],
    reviews: articleData ? articleData.reviews : []
  };
}

export default connect(
  mapStateToProps
)(ReviewApprove);
