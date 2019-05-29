import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withNamespaces } from 'react-i18next';

import TextField from '~/components/TextField/TextField';
import Button from '~/components/Button/Button';
import ReqMark from '~/components/ReqMark/ReqMark';

import * as validate from '~/utils/validate';

import './mail-form.scss';

class MailForm extends Component {
  render() {
    const { handleSubmit, t } = this.props;
    return (
      <form className="mail-form form" onSubmit={ handleSubmit }>
        <div className="form__field">
          <label className="form__label" htmlFor="mail-subject">
            { t('message_subject') } <ReqMark />
          </label>
          <Field name="subject" id="mail-subject"
                 component={ TextField } placeholder={ t('enter_message_subject') }
                 validate={ [validate.required] } />
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor="mail-text">
            { t('message_text') } <ReqMark />
          </label>
          <Field name="text" id="mail-text" textarea minRows={ 4 }
                 component={ TextField } placeholder={ t('enter_message_text') }
                 validate={ [validate.required] } />
        </div>
        <div className="form__field">
          <Button type="submit">{ t('send') }</Button>
        </div>
      </form>
    );
  }
}

MailForm = reduxForm({
  form: 'mail',
  destroyOnUnmount: true
})(MailForm);

MailForm = withNamespaces()(MailForm);

export default MailForm;
