import React, { Component } from 'react';
import { connect } from 'react-redux';

import Collapse from '~/components/Collapse/Collapse';
import FieldHint from '~/components/FieldHint/FieldHint';
import ReviewEstimate from '~/components/ReviewEstimate/ReviewEstimate';

import { getUsersArray } from '../../store/users/selector';

import './reviews-history.scss';

class ReviewsHistory extends Component {
  renderList = () => {
    const { reviews, isCollapse } = this.props;

    return reviews.map((item, index) => {
      return (
        isCollapse ?
        <Collapse key={ index } title={ item.review_round + ` раунд рецензирования` }>
          { this.renderItem(item) }
        </Collapse>
        :
        <React.Fragment key={ index }>
          { this.renderItem(item) }
        </React.Fragment>
      )
    });
  };

  renderItem = (item) => {
    const { author, isCollapse, usersArray } = this.props;
    const authorName = author && `${ author.last_name } ${ author.first_name } ${ author.middle_name }`;
    const reviewer = usersArray.find((user) => user.id === item.reviewer);
    const reviewerName = reviewer && `${ reviewer.last_name } ${ reviewer.first_name } ${ reviewer.middle_name }`;

    return (
      <div className="reviews-history__content">
        {
          !isCollapse && reviewer &&
          <React.Fragment>
            <div className="content-reviews__title">Рецензент:</div>
            <div className="content-reviews__text">
              { reviewerName }
            </div>
          </React.Fragment>
        }

        <div className="reviews-history__review">
          <div className="reviews-history__title">
            Текст рецензии
            {
              isCollapse && <FieldHint text={'Будет опубликован вместе с текстом статьи'}/>
            }
          </div>
          <div className="reviews-history__text">
            { item.comment_for_author }
          </div>
        </div>
        {
          !isCollapse &&
          <div className="reviews-history__table">
            <ReviewEstimate values={ item } disabled={ true } />
          </div>
        }
        {/*{ item.author_answer &&*/}
        <div className="reviews-history__answer">
          <div className="reviews-history__title">
            Ответ автора
          </div>
          { author &&
          <div className="reviews-history__author">
            { authorName }
          </div>
          }
          <div className="reviews-history__text">
            {/*{ item.author_answer }*/}
            текст ответа автора
          </div>
        </div>
        {/*}*/}
      </div>
    )
  };

  render() {
    return (
      <div className="reviews-history">
        { this.renderList() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    usersArray: getUsersArray(state)
  }
}

export default connect(mapStateToProps)(ReviewsHistory);
