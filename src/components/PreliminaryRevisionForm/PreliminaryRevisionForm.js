import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import TextField from '~/components/TextField/TextField';
import Button from '~/components/Button/Button';

import * as validate from '~/utils/validate';
import * as articlesActions from '~/store/articles/actions';

import './preliminary-revision-form.scss';
import connect from 'react-redux/es/connect/connect';

class PreliminaryRevisionForm extends Component {
  handleSubmit = (data) => {
    const { editArticle, articleId } = this.props;
    editArticle(articleId, { ...data, state_article: 'PRELIMINARY_REVISION' });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="preliminary-revision-form" onSubmit={ handleSubmit(this.handleSubmit) }>
        <div className="preliminary-revision-form__title">
          Отправить статью автору для доработки. Замечания к статье:
        </div>
        <Field name="redactor_review" id="redactor_review" component={ TextField } textarea
               className="text-field_small" minRows={ 6 } validate={ [validate.required] }
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

const mapDispatchToProps = {
  editArticle: articlesActions.editArticle
};

export default connect(
  null,
  mapDispatchToProps
)(PreliminaryRevisionForm);
