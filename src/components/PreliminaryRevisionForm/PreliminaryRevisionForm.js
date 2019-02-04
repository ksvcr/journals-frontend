import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import TextField from '~/components/TextField/TextField';
import Button from '~/components/Button/Button';

import * as validate from '~/utils/validate';

import './preliminary-revision-form.scss';

class PreliminaryRevisionForm extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit');
  };

  render() {
    return (
      <form className="preliminary-revision-form" onSubmit={ this.handleSubmit }>
        <div className="preliminary-revision-form__title">
          Отправить статью автору для доработки. Замечания к статье:
        </div>
        <Field name="comment_for_author" id="comment_for_author" component={ TextField } textarea
               className="text-field_small" rows={ 6 } validate={ [validate.required] }
               placeholder="Введите замечания к статье" />
        <div className="preliminary-revision-form__submit">
          <Button className="button_orange" type="submit">
            Отправить
          </Button>
        </div>
      </form>
    );
  }
}

PreliminaryRevisionForm = reduxForm({
  form: 'preliminary-revision'
})(PreliminaryRevisionForm);

export default PreliminaryRevisionForm;
