import React, { Component } from 'react';

import ReviewEstimate from '~/components/ReviewEstimate/ReviewEstimate';
import RedactorDecision from '~/components/RedactorDecision/RedactorDecision';

import './review-content.scss';

class ReviewContent extends Component {
  get recomendationMap() {
    return {
      1: 'Принять',
      2: 'Доработать',
      3: 'Отклонить'
    };
  }

  render() {
    const { data, isShowDecision, articleId } = this.props;
    return (
      <div className="review-content">
        <div className="review-content__item">
          <div className="review-content__label">
            Рекомендация рецензента
          </div>
          <div className="review-content__head">
            { this.recomendationMap[data.recommendation] }
          </div>
        </div>

        <div className="review-content__item">
          <div className="review-content__label">
            Текст рецензии
          </div>
          <div className="review-content__value">
            { data.comment_for_author }
          </div>
        </div>

        <div className="review-content__item">
          <div className="review-content__head">
            Мнение рецензента о статье
          </div>
          <div className="review-content__estimate">
            <ReviewEstimate values={ data } disabled={ true } />
          </div>
          <hr className="page__divider" />
        </div>

        <div className="review-content__item">
          <div className="review-content__label">
            Замечания для редактора по доработке статьи
          </div>
          <div className="review-content__value">
            { data.comment_for_redactor }
          </div>
        </div>

        { isShowDecision &&
          <div className="review-content__item">
            <div className="review-content__label">
              Вынести решение по статье
            </div>
            <RedactorDecision articleId={ articleId } />
          </div>
        }
      </div>
    );
  }
}

export default ReviewContent;
