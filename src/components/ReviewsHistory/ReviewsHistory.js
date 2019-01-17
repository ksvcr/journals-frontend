import React, { Component } from 'react';

import ToggleItem from '~/components/ToggleItem/ToggleItem';

import './reviews-history.scss';

class ReviewsHistory extends Component {
  renderList = (list) => {
    return list.map((item, index) => (
      <ToggleItem key={ index } title={ item.review_round + ` раунд рецензирования` }>
        <div className="reviews-history__content">
          <div className="reviews-history__review">
            <div className="reviews-history__title">
              Текст рецензии
            </div>
            <div className="reviews-history__notice">
              Будет опубликован вместе с текстом статьи
            </div>
            <div className="reviews-history__text">
              { item.comment_for_author }
            </div>
          </div>
          <div className="reviews-history__answer">
            <div className="reviews-history__title">
              Ответ автора
            </div>
            <div className="reviews-history__author">
              Крестовоздвиженский Евгений Николаевич
            </div>
            <div className="reviews-history__text">
              { item.author_answer }
            </div>
          </div>
        </div>
      </ToggleItem>
    ));
  };

  render() {
    const { reviews } = this.props;

    return (
      <div className="reviews-history">
        { this.renderList(reviews) }
      </div>
    );
  }
}

export default ReviewsHistory;
