import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import TextField from '~/components/TextField/TextField';
import Button from '~/components/Button/Button';
import * as validate from '~/utils/validate';

import './mail-form.scss';
import ReqMark from '~/components/ReqMark/ReqMark';

class MailForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="mail-form form" onSubmit={ handleSubmit }>
        <div className="form__field">
          <label className="form__label" htmlFor="mail-subject">
            Тема сообщения <ReqMark />
          </label>
          <Field name="subject" id="mail-subject"
                 component={ TextField } placeholder="Введите тему сообщения"
                 validate={ [validate.required] } />
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor="mail-text">
            Текст сообщения <ReqMark />
          </label>
          <Field name="text" id="mail-text" textarea minRows={ 4 }
                 component={ TextField } placeholder="Введите текст сообщения"
                 validate={ [validate.required] } />
        </div>
        <div className="form__field">
          <Button type="submit">Отправить</Button>
        </div>
      </form>
    );
  }
}

MailForm = reduxForm({
  form: 'mail',
  destroyOnUnmount: true
})(MailForm);

export default MailForm;
