import React, { Component } from 'react';

import Icon from '~/components/Icon/Icon';

import './assets/arrow.svg';
import './reviews-history.scss';

class ReviewsHistory extends Component {
  handleToggleItem = () => {

  };

  renderList = () => {
    const { reviews } = this.props;
    return reviews.map((item) => (
      <div className="reviews-history__item" onClick={ this.handleToggleItem }>
        <div className="reviews-history__head">
          <div className="reviews-history__round">
            { item.review_round } раунд рецензирования
          </div>
          <Icon name="arrow" className="reviews-history__arrow" />
        </div>
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
      </div>
    ));
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
