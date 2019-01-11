import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { push } from 'connected-react-router';

import TextField from '~/components/TextField/TextField';
import ReqMark from '~/components/ReqMark/ReqMark';
import Button from '~/components/Button/Button';
import ReviewEstimate from '~/components/ReviewEstimate/ReviewEstimate';
import MultiSwitch from '~/components/MultiSwitch/MultiSwitch';

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
        value: '1'
      },
      {
        title: 'Доработать',
        value: '2'
      },
      {
        title: 'Отклонить',
        value: '3'
      }
    ];
  }

  handleRecommendationChange = (value) => {
    const { change } = this.props;
    change('recommendation', value);
  };

  render() {
    const { articleData, handleSubmit, recommendation } = this.props;
    return articleData ? (
      <form className="review-create-form" onSubmit={ handleSubmit } >
        <h2 className="page__title">{ articleData.title }</h2>
        <div className="form__field">
          <label htmlFor="recommendation" className="form__label">
            Ваши рекомендации к статье:
          </label>
          <MultiSwitch id="recommendation" name="recommendation" options={ this.recommendationOptions }
                       onChange={ this.handleRecommendationChange } value={ recommendation } />
        </div>
        <div className="form__field">
          <label htmlFor="comment_for_author" className="form__label">
            Текст рецензии
          </label>
          <Field name="comment_for_author" id="comment_for_author" component={ TextField } textarea rows={ 20 }
                 placeholder="Введите текст рецензии" />
        </div>
        <div className="review-create-form__estimate">
          <ReviewEstimate onChange={ this.handleEstimateChange } />
        </div>
        <div className="form__field">
          <label htmlFor="comment_for_redactor" className="form__label">
            Замечания для редактора по доработке статьи (не показываются автору) <ReqMark />
          </label>
          <Field name="comment_for_redactor" id="comment_for_redactor" component={ TextField } textarea rows={ 10 }
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
  const { articles } = state;
  const selector = formValueSelector('review-create');

  return {
    push,
    articleData: articles.data[articleId],
    recommendation: selector(state, 'recommendation'),
    initialValues: {
      recommendation: '1'
    }
  };
}

export default connect(
  mapStateToProps
)(ReviewCreateForm);
