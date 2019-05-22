import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withNamespaces } from 'react-i18next';

import TextField from '~/components/TextField/TextField';
import Button from '~/components/Button/Button';

import * as validate from '~/utils/validate';
import * as articlesActions from '~/store/articles/actions';
import { connect } from 'react-redux';

import './preliminary-revision-form.scss';

class PreliminaryRevisionForm extends Component {
  handleSubmit = (data) => {
    const { editArticle, articleId } = this.props;
    editArticle(articleId, { ...data, state_article: 'PRELIMINARY_REVISION' });
  };

  render() {
    const { handleSubmit, t } = this.props;
    return (
      <form className="preliminary-revision-form" onSubmit={ handleSubmit(this.handleSubmit) }>
        <div className="preliminary-revision-form__title">
          { t('send_article_to_revision') }. { t('comment_to_article') }:
        </div>
        <Field name="redactor_review" id="redactor_review" component={ TextField } textarea
               className="text-field_small" minRows={ 6 } validate={ [validate.required] }
               placeholder={ t('enter_comment_to_article') } />
        <div className="preliminary-revision-form__submit">
          <Button className="button_orange" type="submit">
            { t('send') }
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

PreliminaryRevisionForm = withNamespaces()(PreliminaryRevisionForm);

export default connect(
  null,
  mapDispatchToProps
)(PreliminaryRevisionForm);
