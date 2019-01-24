import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Field, getFormValues, reduxForm} from 'redux-form';

import FieldHint from '~/components/FieldHint/FieldHint';
import TextField from '~/components/TextField/TextField';

import './reviews-dialog.scss';

class ReviewsDialog extends Component {
  handleSubmit = (event) => {
    const { onSubmit, formValues, item } = this.props;
    const { id } = item;
    event.preventDefault();
    console.log(formValues);
    onSubmit(id, formValues);
  };

  render() {
    const { item } = this.props;

    return (
      <form className="reviews-dialog" onSubmit={ this.handleSubmit }>
        <div className="reviews-dialog__comment">
          { item.comment_for_author }
        </div>
        <div className="reviews-dialog__answer">
          <div className="form__field">
            <label htmlFor="author_answer" className="form__label">
              ваш ответ (будет опубликован вместе со статьей)
              <FieldHint text={'Когда статья будет опубликована в журнале, в ее составе ' +
              'будет текст рецензии и ваш ответ на нее'} />
            </label>
            <Field name="author_answer" id="author_answer" textarea minRows={ 5 } component={ TextField }
                   placeholder="Введите Ваш ответ" />
          </div>
          <button className="reviews-dialog__button" type="submit">Ответить</button>
        </div>
      </form>
    );
  }
}

ReviewsDialog = reduxForm({
  destroyOnUnmount: false
})(ReviewsDialog);

function mapStateToProps(state, props) {
  const { formName } = props;
  const formValues = getFormValues(formName)(state);

  return {
    form: formName,
    formValues,
    initialValues: getInitialValues(props),
  };
}

function getInitialValues(props) {
  const { item } = props;
  const { article, reviewer, review_round } = item;

  const initialValues = {
    article,
    reviewer,
    review_round,
  };

  return initialValues;
}

export default connect(mapStateToProps)(ReviewsDialog);
