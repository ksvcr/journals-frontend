import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, getFormValues, reduxForm } from 'redux-form';
import { withNamespaces } from 'react-i18next';

import FieldHint from '~/components/FieldHint/FieldHint';
import TextField from '~/components/TextField/TextField';

import * as validate from '~/utils/validate';

import './reviews-dialog.scss';

class ReviewsDialog extends Component {
  state = {
    answerValue: ''
  };

  handleSubmit = event => {
    const { onSubmit, formValues } = this.props;
    const { id } = this.props.item;
    const answer = event.target.author_answer.value;
    event.preventDefault();
    if (answer) {
      onSubmit(id, formValues);
      this.setState({ answerValue: answer });
    }
  };

  render() {
    const { item, t } = this.props;
    const { answerValue } = this.state;
    const answer = item.author_answer || answerValue;

    return (
      <div className="reviews-dialog">
        <div className="reviews-dialog__comment">{ item.comment_for_author }</div>
        <form className="reviews-dialog__answer" onSubmit={ this.handleSubmit }>
          <div className="form__field">
            <label htmlFor="author_answer" className="form__label">
              { t('your_answer') } ({ t('will_be_published') })
              <FieldHint
                text={ t('review_publish_hint') }
              />
            </label>
            { answer ? (
              <div className="reviews-dialog__comment">{ answer }</div>
            ) : (
              <Field
                name="author_answer"
                id="author_answer"
                textarea
                minRows={ 5 }
                component={ TextField }
                placeholder={ t('enter_your_answer') }
                validate={ [validate.required] }
              />
            ) }
          </div>
          { !answer && (
            <button className="reviews-dialog__button" type="submit">
              { t('reply') }
            </button>
          ) }
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
    initialValues: getInitialValues(props)
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

ReviewsDialog = withNamespaces()(ReviewsDialog);

export default connect(mapStateToProps)(ReviewsDialog);
