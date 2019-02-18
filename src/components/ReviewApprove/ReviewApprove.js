import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Field, change} from 'redux-form';

import Radio from '~/components/Radio/Radio';
import TextField from '~/components/TextField/TextField';

import './review-approve.scss';

class ReviewApprove extends Component {
  handleReviewChange = ({target}) => {
    const {reviews, formName, change} = this.props;
    let {value: reviewId} = target;
    reviewId = parseInt(reviewId, 10);
    const review = reviews.find(item => reviewId === item.id);
    if (review) {
      change(formName, 'comment_for_redactor', review.comment_for_redactor);
    }
  };

  renderItems = () => {
    const { reviews, reviewInvites } = this.props;
    return reviews.map(review => {
      const invite = reviewInvites.find(item => review.invite === item.id);
      const { reviewer } = invite;
      return (
        <div className="review-approve__item" key={ review.id }>
          <Field name="review_for_approve" type="radio" value={review.id}
                 component={Radio} parse={value => parseInt(value, 10)} onChange={this.handleReviewChange}>
            {`Включить рецензию ${ reviewer.first_name } ${ reviewer.last_name }`}
          </Field>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="review-approve">
        <div className="review-approve__list">
          {this.renderItems()}
        </div>
        <div className="review-approve__preview">
          <Field name="comment_for_redactor" textarea minRows={6} component={TextField}/>
        </div>
      </div>
    );
  }
}

ReviewApprove.propTypes = {
  articleId: PropTypes.number
};

function mapStateToProps(state, props) {
  const { articles } = state;
  const {articleId, formName} = props;

  const articleData = articles.data[articleId];

  return {
    formName,
    reviewInvites: articleData && articleData.reviewInvites ? articleData.reviewInvites : [],
    reviews: articleData && articleData.reviews ? articleData.reviews : []
  };
}

const mapDispatchToProps = {
  change
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewApprove);
