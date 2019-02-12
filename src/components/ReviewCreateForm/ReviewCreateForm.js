import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { push } from 'connected-react-router';

import TextField from '~/components/TextField/TextField';
import ReqMark from '~/components/ReqMark/ReqMark';
import Button from '~/components/Button/Button';
import ReviewEstimate from '~/components/ReviewEstimate/ReviewEstimate';
import MultiSwitch from '~/components/MultiSwitch/MultiSwitch';
import ReviewsHistory from '~/components/ReviewsHistory/ReviewsHistory';

import * as validate from '~/utils/validate';

import './review-create-form.scss';

class ReviewCreateForm extends Component {
  componentDidUpdate() {
    const { articleData, push } = this.props;
    if (!articleData) {
      push('/');
    }
  }

  handleEstimateChange = (field, value) => {
    const { change } = this.props;
    change(field, value);
  };

  get recommendationOptions() {
    return [
      {
        title: 'Принять',
        value: 1,
        color: 'green'
      },
      {
        title: 'Доработать',
        value: 2,
        color: 'orange'
      },
      {
        title: 'Отклонить',
        value: 3,
        color: 'red'
      }
    ];
  }

  get commentForAuthorLabel() {
    const { reviews, recommendation } = this.props;
    let label = 'Текст рецензии';
    const review_round = reviews.length + 1;
    if (recommendation !== 1) {
      label = `Замечания после ${review_round} раунда рецензирования`;
    }
    return label;
  }

  handleRecommendationChange = (value) => {
    const { change } = this.props;
    value = parseInt(value, 10);
    change('recommendation', value);
  };

  render() {
    const { articleData, handleSubmit, recommendation, reviews, author } = this.props;

    return articleData ? (
      <form className="review-create-form" onSubmit={ handleSubmit }>
        <h2 className="page__title">{ articleData.title }</h2>

        <div className="form__field">
          <label htmlFor="recommendation" className="form__label">
            Ваши рекомендации к статье:
          </label>
          <MultiSwitch id="recommendation" name="recommendation" options={ this.recommendationOptions }
                       onChange={ this.handleRecommendationChange } value={ recommendation } />
        </div>

        { recommendation === 2 && reviews.length > 0 &&
          <ReviewsHistory reviews={ reviews } author={ author }/>
        }

        <div className="form__field">
          <label htmlFor="comment_for_author" className="form__label">
            { this.commentForAuthorLabel }
          </label>
          <Field name="comment_for_author" id="comment_for_author" component={ TextField } textarea
                 rows={ recommendation === 1 ? 20 : 6 }
                 placeholder="Введите текст рецензии" />
        </div>

        { recommendation === 1 &&
          <div className="review-create-form__estimate">
            <ReviewEstimate onChange={ this.handleEstimateChange } />
          </div>
        }

        <div className="form__field">
          <label htmlFor="comment_for_redactor" className="form__label">
            Замечания для редактора по доработке статьи (не показываются автору) <ReqMark />
          </label>
          <Field name="comment_for_redactor" id="comment_for_redactor" component={ TextField } textarea
                 rows={ 6 }
                 placeholder="Введите текст рецензии" validate={ [validate.required] } />
        </div>

        <div className="form__field">
          <Button type="submit">Отправить рецензию</Button>
        </div>
      </form>
    ) : null;
  }
}

ReviewCreateForm = reduxForm({
  form: 'review-create'
})(ReviewCreateForm);

function mapStateToProps(state, props) {
  const { id:articleId } = props;
  const { articles, users } = state;
  const selector = formValueSelector('review-create');
  const recommendation = selector(state, 'recommendation');
  const articleData = articles.data[articleId];
  const author = articleData && users.data[articleData.author.user];

  return {
    push,
    articleData,
    recommendation,
    initialValues: {
      recommendation: 1
    },
    author
  };
}

export default connect(
  mapStateToProps
)(ReviewCreateForm);
