import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withNamespaces } from 'react-i18next';

import Collapse from '~/components/Collapse/Collapse';
import FieldHint from '~/components/FieldHint/FieldHint';
import ReviewEstimate from '~/components/ReviewEstimate/ReviewEstimate';

import { getUsersArray } from '../../store/users/selector';

import './reviews-history.scss';

class ReviewsHistory extends Component {
  renderList = () => {
    const { reviews, isCollapse } = this.props;
    return reviews.map((item, index) => {
      return isCollapse ? (
        <Collapse key={ index } title={ item.review_round + ` ${'review_round'}` } >
          { this.renderItem(item) }
        </Collapse>
      ) : (
        <React.Fragment key={ index }>
          { this.renderItem(item) }
        </React.Fragment>
      );
    });
  };

  renderItem = item => {
    const { author, isCollapse, usersArray, t } = this.props;
    const authorName =
      author &&
      `${author.last_name} ${author.first_name} ${author.middle_name}`;
    const reviewer = usersArray.find(user => user.id === item.reviewer);
    const reviewerName =
      reviewer &&
      `${reviewer.last_name} ${reviewer.first_name} ${reviewer.middle_name}`;

    return (
      <div className="reviews-history__content">
        { !isCollapse && reviewer && (
          <div className="reviews-history__info">
            <span className="reviews-history__info-title">{ t('reviewer') }:</span>
            { reviewerName }
          </div>
        ) }

        <div className="reviews-history__review">
          <div className="reviews-history__title">
            { t('review_text') }
            { isCollapse && (
              <FieldHint text={ t('will_be_published') } />
            ) }
          </div>
          <div className="reviews-history__text">{ item.comment_for_author }</div>
        </div>
        { !isCollapse && (
          <div className="reviews-history__table">
            <ReviewEstimate values={ item } disabled={ true } />
          </div>
        ) }
        { item.author_answer && (
          <div className="reviews-history__answer">
            <div className="reviews-history__title">{ t('author_answer') }</div>
            { author && (
              <div className="reviews-history__author">{ authorName }</div>
            ) }
            <div className="reviews-history__text">{ item.author_answer }</div>
          </div>
        ) }
      </div>
    );
  };

  render() {
    const { className } = this.props;
    const classes = classNames('reviews-history', className);

    return <div className={ classes }>{ this.renderList() }</div>;
  }
}

function mapStateToProps(state) {
  return {
    usersArray: getUsersArray(state)
  };
}

ReviewsHistory = withNamespaces()(ReviewsHistory);

export default connect(mapStateToProps)(ReviewsHistory);
