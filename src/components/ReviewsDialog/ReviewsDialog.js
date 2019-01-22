import React, {Component} from 'react';
import {Field} from 'redux-form';

import ToggleItem from '~/components/ToggleItem/ToggleItem';
import TextField from '~/components/TextField/TextField';


class ReviewsDialog extends Component {
  renderList = () => {
    const newArray = this.reviewsArray;

    return newArray.map((array, index) => {
      return array.map((item, i) => (
        <ToggleItem key={ i } title={ index+1 + ' рецензент' }>
          <div className="reviews-dialog__comment">
            { item.comment_for_author }
          </div>          
          <div className="reviews-dialog__answer">
            <form action="">
              <div className="form__field">
                <label htmlFor="" className="form__label">
                  ваш ответ (будет опубликован вместе со статьей)
                </label>
                {/*<Field name="" id="" textarea minRows={ 2 } component={ TextField }*/}
                       {/*placeholder="Введите аннотацию" />*/}
              </div>
              <button>Ответить</button>
            </form>
          </div>
        </ToggleItem>
      ));
    });
  };

  get reviewsArray() {
    const { reviews } = this.props;
    let newArray = [];

    this.reviewersIdsArray.forEach((id) => {
      const reviewsByAuthor = reviews.filter(review => review.reviewer === id);
      newArray.push(reviewsByAuthor);
    });

    return newArray;
  }

  get reviewersIdsArray() {
    const { reviews } = this.props;
    let reviewers = [];
    reviews.map(item => reviewers.push(item.reviewer));
    //get unique values
    reviewers = reviewers.filter((v, i, a) => a.indexOf(v) === i);
    return reviewers;
  }

  render() {
    return (
      <div className="reviews-dialog">
        { this.renderList() }
      </div>
    );
  }
}

export default ReviewsDialog;
