import React, { Component } from 'react';

import {Field, reduxForm} from 'redux-form';
import TextField from '~/components/TextField/TextField';

class ArticleAuthorsForm extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form className="article-common" onSubmit={ handleSubmit }>
        <h2 className="page__title">Авторы</h2>
        <div className="form__field">
          <label htmlFor="author" className="form__label">
            Автор
          </label>
          <Field name="author" id="author" component={ TextField } />
        </div>
      </form>
    );
  }
}

ArticleAuthorsForm = reduxForm({
  form: 'article-publish',
  destroyOnUnmount: false
})(ArticleAuthorsForm);

export default ArticleAuthorsForm;
