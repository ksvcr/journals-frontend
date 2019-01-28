import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Field, getFormValues, reduxForm} from 'redux-form';

import FieldHint from '~/components/FieldHint/FieldHint';
import TextField from '~/components/TextField/TextField';

import * as validate from '~/utils/validate';

import './reviews-dialog.scss';

class ReviewsDialog extends Component {
  handleSubmit = (event) => {
    const { onSubmit, formValues } = this.props;
    const { id } = this.props.item;
    const isAnswered = event.target.author_answer.value;
    event.preventDefault();
    if (isAnswered) {
      onSubmit(id, formValues);
    }
  };

  render() {
    const { item } = this.props;
    const isAnswered = item.author_answer;

    return (
      <div className="reviews-dialog">
        <div className="reviews-dialog__comment">
          { item.comment_for_author }
        </div>
        <form className="reviews-dialog__answer" onSubmit={ this.handleSubmit }>
          <div className="form__field">
            <label htmlFor="author_answer" className="form__label">
              ваш ответ (будет опубликован вместе со статьей)
              <FieldHint text={'Когда статья будет опубликована в журнале, в ее составе ' +
              'будет текст рецензии и ваш ответ на нее'}/>
            </label>
            { isAnswered ?
              <div className="reviews-dialog__comment">{item.author_answer}</div>
              :
              <Field name="author_answer" id="author_answer" textarea minRows={5} component={TextField}
                     placeholder="Введите Ваш ответ" validate={ [validate.required] }/>
            }
          </div>
          { !isAnswered && <button className="reviews-dialog__button" type="submit">Ответить</button> }
        </form>
      </div>
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
  const { article, reviewer, review_round, author_answer } = props.item;

  const initialValues = {
    article,
    reviewer,
    review_round,
    author_answer
  };

  return initialValues;
}

export default connect(mapStateToProps)(ReviewsDialog);
