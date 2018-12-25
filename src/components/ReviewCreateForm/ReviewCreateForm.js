import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { push } from 'connected-react-router';

import TextField from '~/components/TextField/TextField';
import ReqMark from '~/components/ReqMark/ReqMark';
import Button from '~/components/Button/Button';

import * as validate from '~/utils/validate';

class ReviewCreateForm extends Component {
  componentDidUpdate() {
    const { articleData, push } = this.props;
    if (!articleData) {
      push('/');
    }
  }

  render() {
    const { articleData } = this.props;
    return articleData ? (
      <div className="review-create-form">
        <h2 className="page__title">{ articleData.title }</h2>
        <div className="form__field">
          <label htmlFor="comment_for_author" className="form__label">
            Текст рецензии
          </label>
          <Field name="comment_for_author" id="thanks_text" component={ TextField } textarea rows={ 20 }
                 placeholder="Введите текст рецензии" />
        </div>
        <div className="form__field">
          <label htmlFor="comment_for_author" className="form__label">
            Замечания для редактора по доработке статьи (не показываются автору) <ReqMark />
          </label>
          <Field name="comment_for_author" id="thanks_text" component={ TextField } textarea rows={ 10 }
                 placeholder="Введите текст рецензии" validate={ [validate.required] } />
        </div>
        <div className="form__field">
          <Button type="submit">Отправить рецензию</Button>
        </div>
      </div>
    ) : null;
  }
}

ReviewCreateForm = reduxForm({
  form: 'review-create'
})(ReviewCreateForm);

function mapStateToProps(state, props) {
  const { id:articleId } = props;
  const { articles } = state;

  return {
    push,
    articleData: articles.data[articleId]
  };
}

export default connect(
  mapStateToProps
)(ReviewCreateForm);
