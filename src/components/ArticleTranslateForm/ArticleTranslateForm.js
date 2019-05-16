import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFormValues, isInvalid, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import ArticleWizard from '~/components/ArticleWizard/ArticleWizard';
import Button from '~/components/Button/Button';
import ArticleCommonTranslateForm from '~/components/ArticleCommonTranslateForm/ArticleCommonTranslateForm';
import ArticleSourcesTranslateForm from '~/components/ArticleSourcesTranslateForm/ArticleSourcesTranslateForm';

import { deserializeArticleData } from '~/services/articleFormat';
import { getUserData } from '~/store/user/selector';

import './article-translate-form.scss';
import './assets/save.svg';

const FORM_NAME = 'article-translate';

class ArticleTranslateForm extends Component {
  get formProps() {
    const { id, isTranslator } = this.props;
    return {
      id,
      formName: FORM_NAME,
      isTranslator
    };
  }

  get wizardSteps() {
    const { t } = this.props;
    return [
      {
        title: t('common_content'),
        component: <ArticleCommonTranslateForm { ...this.formProps } />
      },
      {
        title: t('source_list'),
        component: <ArticleSourcesTranslateForm { ...this.formProps } />
      }
    ];
  }

  renderTools = () => {
    const { t, handleSubmit, isInvalidForm } = this.props;
    return (
      <React.Fragment>
        <Button className="button_orange" onClick={ handleSubmit } disabled={ isInvalidForm } >
          { t('save_translation') }
        </Button>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="article-translate-form">
        <div className="article-translate-form__wizard">
          <ArticleWizard steps={ this.wizardSteps } tools={ this.renderTools } />
        </div>
      </div>
    );
  }
}

ArticleTranslateForm = reduxForm({
  form: FORM_NAME,
  destroyOnUnmount: false,
  enableReinitialize: true
})(ArticleTranslateForm);

function mapStateToProps(state, props) {
  const isInvalidForm = isInvalid(FORM_NAME)(state);
  const formValues = getFormValues(FORM_NAME)(state);
  const { userRole } = getUserData(state);

  return {
    isInvalidForm,
    formValues,
    initialValues: getInitialValues(state, props),
    isTranslator: userRole === 'TRANSLATOR'
  };
}

ArticleTranslateForm.propTypes = {
  id: PropTypes.number,
  onSubmit: PropTypes.func
};

function getInitialValues(state, props) {
  const { articles } = state;
  const { id } = props;
  const data = deserializeArticleData(articles.data[id]);
  const { translation } = data;

  const initialValues = {
    sources: data.sources,
    financing_sources: translation ? translation.financing_sources :
      data.financing_sources.map(item => ({
        id: item.id,
        financing_id: item.financing_id,
        grant_number: item.grant_number
      })),
    title: translation && translation.title,
    conflict_interest: translation && translation.conflict_interest,
    text_to_description: translation && translation.text_to_description,
    text_to_keywords: translation && translation.text_to_keywords,
    text_to_title: translation && translation.text_to_title,
    thanks_text: translation && translation.thanks_text,
  };

  return initialValues;
}

ArticleTranslateForm = withNamespaces()(ArticleTranslateForm);

export default connect(
  mapStateToProps,
)(ArticleTranslateForm);
