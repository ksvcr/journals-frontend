import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { push } from 'connected-react-router';

import TextField from '~/components/TextField/TextField';
import ReqMark from '~/components/ReqMark/ReqMark';
import Button from '~/components/Button/Button';
import List from '~/components/List/List';
import Radio from '~/components/Radio/Radio';

import getEstimateFields from '~/services/getEstimateFields';

import * as validate from '~/utils/validate';

import './review-create-form.scss';

class ReviewCreateForm extends Component {
  componentDidUpdate() {
    const { articleData, push } = this.props;
    if (!articleData) {
      push('/');
    }
  }

  renderEstimateRadio = (value) => (data) => (
    <div className="review-create-form__estimate__radio">
      <Field name={ data.id } value={ value } type="radio" component={ Radio } />
    </div>
  );

  get estimateProps() {
    const radioCellStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };

    return {
      data: getEstimateFields(),
      head: true,
      cells: [
        {
          style: {
            width: '25%'
          },
          head: () => 'Ваше мнение о статье',
          render: (data) => <p className="review-create-form__estimate__title">{ data.title }</p>
        },
        {
          style: {
            width: '13%',
            ...radioCellStyle
          },
          head: () => 'Не согласен',
          render: this.renderEstimateRadio('1')
        },
        {
          style: {
            width: '20%',
            ...radioCellStyle
          },
          head: () => 'Скорее не согласен',
          render: this.renderEstimateRadio('2')
        },
        {
          style: {
            width: '12%',
            ...radioCellStyle
          },
          head: () => 'Нейтрален',
          render: this.renderEstimateRadio('3')
        },
        {
          style: {
            width: '20%',
            ...radioCellStyle
          },
          head: () => 'Скорее согласен',
          render: this.renderEstimateRadio('4')
        },
        {
          style: {
            width: '10%',
            ...radioCellStyle
          },
          head: () => 'Согласен',
          render: this.renderEstimateRadio('5')
        }
      ]
    };
  }

  render() {
    const { articleData, handleSubmit } = this.props;
    return articleData ? (
      <form className="review-create-form" onSubmit={ handleSubmit } >
        <h2 className="page__title">{ articleData.title }</h2>
        <div className="form__field">
          <label htmlFor="comment_for_author" className="form__label">
            Текст рецензии
          </label>
          <Field name="comment_for_author" id="comment_for_author" component={ TextField } textarea rows={ 20 }
                 placeholder="Введите текст рецензии" />
        </div>
        <div className="review-create-form__estimate">
          <List { ...this.estimateProps } />
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

  return {
    push,
    articleData: articles.data[articleId]
  };
}

export default connect(
  mapStateToProps
)(ReviewCreateForm);
