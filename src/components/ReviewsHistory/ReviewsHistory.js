import React, { Component } from 'react';

import ToggleItem from '~/components/ToggleItem/ToggleItem';
import FieldHint from '~/components/FieldHint/FieldHint';

import './reviews-history.scss';

class ReviewsHistory extends Component {
  renderReviews = () => {
    const { reviews, author } = this.props;
    const authorName = `${author.last_name} ${author.first_name} ${author.middle_name}`;

    return reviews.map((item, index) => (
      <ToggleItem key={ index } title={ item.review_round + ` раунд рецензирования` }>
        <div className="reviews-history__content">
          <div className="reviews-history__review">
            <div className="reviews-history__title">
              Текст рецензии
              <FieldHint text={'Будет опубликован вместе с текстом статьи'}/>
            </div>
            <div className="reviews-history__text">
              { item.comment_for_author }
            </div>
          </div>
          { item.author_answer &&
            <div className="reviews-history__answer">
              <div className="reviews-history__title">
                Ответ автора
              </div>
              <div className="reviews-history__author">
                { authorName }
              </div>
              <div className="reviews-history__text">
                { item.author_answer }
              </div>
            </div>
          }
        </div>
      </ToggleItem>
    ));
  };

  render() {
    return (
      <div className="reviews-history">
        { this.renderReviews() }
      </div>
    );
  }
}

export default ReviewsHistory;
