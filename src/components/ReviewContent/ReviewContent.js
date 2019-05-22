import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';

import ReviewEstimate from '~/components/ReviewEstimate/ReviewEstimate';
import RedactorDecision from '~/components/RedactorDecision/RedactorDecision';

import './review-content.scss';

class ReviewContent extends Component {
  get recomendationMap() {
    const { t } = this.props;
    return {
      1: t('accept'),
      2: t('finalize'),
      3: t('reject')
    };
  }

  render() {
    const { t, data, isShowDecision, articleId } = this.props;
    return (
      <div className="review-content">
        <div className="review-content__item">
          <div className="review-content__label">
            { t('reviewer_recommendation') }
          </div>
          <div className="review-content__head">
            { this.recomendationMap[data.recommendation] }
          </div>
        </div>

        <div className="review-content__item">
          <div className="review-content__label">
            { t('review_text') }
          </div>
          <div className="review-content__value">
            { data.comment_for_author }
          </div>
        </div>

        <div className="review-content__item">
          <div className="review-content__head">
            { t('reviewers_opinion_about_article') }
          </div>
          <div className="review-content__estimate">
            <ReviewEstimate values={ data } disabled={ true } />
          </div>
          <hr className="page__divider" />
        </div>

        <div className="review-content__item">
          <div className="review-content__label">
            { t('comment_for_redactor') }
          </div>
          <div className="review-content__value">
            { data.comment_for_redactor }
          </div>
        </div>

        { isShowDecision &&
          <div className="review-content__item">
            <div className="review-content__label">
              { t('make_decision') }
            </div>
            <RedactorDecision articleId={ articleId } />
          </div>
        }
      </div>
    );
  }
}

ReviewContent = withNamespaces()(ReviewContent);

export default ReviewContent;
