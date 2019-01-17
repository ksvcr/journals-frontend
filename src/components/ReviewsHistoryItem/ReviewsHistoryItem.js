import React, { Component } from 'react';
import classNames from 'classnames';

import Icon from '~/components/Icon/Icon';

import './assets/arrow.svg';

class ReviewsHistoryItem extends Component {
  state = {
    isOpen: false
  };

  handleToggleItem = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  render() {
    const { item } = this.props;
    const { isOpen } = this.state;
    const classes = classNames('reviews-history__item', {
      'reviews-history__item_opened': isOpen
    });

    return (
      <div className={ classes } onClick={ this.handleToggleItem }>
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
    );
  }
}

export default ReviewsHistoryItem;
