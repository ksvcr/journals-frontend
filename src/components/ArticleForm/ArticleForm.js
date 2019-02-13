import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, isInvalid, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import nanoid from 'nanoid';
import { withNamespaces } from 'react-i18next';

import ArticleWizard from '~/components/ArticleWizard/ArticleWizard';
import ArticleCommonForm from '~/components/ArticleCommonForm/ArticleCommonForm';
import ArticleAuthorsForm from '~/components/ArticleAuthorsForm/ArticleAuthorsForm';
import ArticleContentForm from '~/components/ArticleContentForm/ArticleContentForm';
import ArticleFilesForm from '~/components/ArticleFilesForm/ArticleFilesForm';
import ArticleSourcesForm from '~/components/ArticleSourcesForm/ArticleSourcesForm';
import CorrectFilesForm from '~/components/CorrectFilesForm/CorrectFilesForm';

import Button from '~/components/Button/Button';
import Icon from '~/components/Icon/Icon';

import './article-form.scss';
import './assets/save.svg';

import { getRubricsArray } from '~/store/rubrics/selector';
import { getLanguagesArray } from '~/store/languages/selector';
import {  getRootCategoriesArray } from '~/store/categories/selector';

import getFinancingIds from '~/services/getFinancingIds';
import { deserializeArticleData } from '~/services/articleFormat';

const FORM_NAME_BASE = 'article-publish';

class ArticleForm extends Component {
  get formProps() {
    const { form } = this.props;
    return {
      formName: form
    };
  }

  get wizardSteps() {
    const {t, userData} = this.props;

    switch (userData.role) {
      case 'CORRECTOR':
        return [
          {
            title: t('common_content'),
            component: <ArticleCommonForm { ...this.formProps } />
          },
          {
            title: t('article_text'),
            component: <ArticleContentForm { ...this.formProps } />
          },
          {
            title: t('files_to_article'),
            component: <CorrectFilesForm { ...this.formProps } />
          },
          {
            title: t('source_list'),
            component: <ArticleSourcesForm { ...this.formProps } />
          }
        ];
      default:
        return [
          {
            title: t('common_content'),
            component: <ArticleCommonForm { ...this.formProps } />
          },
          {
            title: t('authors'),
            component: <ArticleAuthorsForm { ...this.formProps } />
          },
          {
            title: t('article_text'),
            component: <ArticleContentForm { ...this.formProps } />
          },
          {
            title: t('files_to_article'),
            component: <ArticleFilesForm { ...this.formProps } />
          },
          {
            title: t('source_list'),
            component: <ArticleSourcesForm { ...this.formProps } />
          }
        ];
    }
  }

  handleDraftSubmit = () => {
    const { formValues, form, onDraftSubmit } = this.props;
    onDraftSubmit(formValues, form);
  };

  handleSubmit = (formData) => {
    const { form, onSubmit } = this.props;
    onSubmit(formData, form);
  }

  renderTools = () => {
    const { id, articleData, handleSubmit, isInvalidForm, t } = this.props;
    const isDraft = articleData && articleData.state_article === 'DRAFT';
    return (
      <React.Fragment>
        { (id === 'new' || isDraft) &&
          <Button onClick={ this.handleDraftSubmit }>
            <Icon name="save" className="article-publish-form__save-icon" />
            { t('save_as_draft') }
          </Button>
        }

        <Button className="button_orange" onClick={ handleSubmit(this.handleSubmit) } disabled={ isInvalidForm } >
          { id === 'new' || isDraft ? t('send_article') : t('save_article') }
        </Button>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="article-publish-form">
        <div className="article-publish-form__wizard">
          <ArticleWizard steps={ this.wizardSteps } tools={ this.renderTools } />
        </div>
      </div>
    );
  }
}

ArticleForm = reduxForm({
  destroyOnUnmount: false
})(ArticleForm);

const initialAuthorHash = nanoid();

function mapStateToProps(state, props) {
  const { user, articles } = state;
  const { id='new' } = props;
  const formName = `${FORM_NAME_BASE}-${id}`;
  const isInvalidForm = isInvalid(formName)(state);
  const formValues = getFormValues(formName)(state);
  return {
    id,
    form: formName,
    formValues,
    isInvalidForm,
    initialValues: getInitialValues(state, props),
    userData: user.data,
    articleData: articles.data[id]
  };
}

function getInitialValues(state, props) {
  const { user, articles } = state;
  const { id } = props;
  const rootCategoriesArray = getRootCategoriesArray(state);
  const rubricsArray = getRubricsArray(state);
  const languagesArray = getLanguagesArray(state);
  const financingIds = getFinancingIds();
  const data = deserializeArticleData(articles.data[id]);

  const initialValues = {
    language: languagesArray.length ? languagesArray[0].twochar_code : null,
    is_conflict_interest: true,
    has_financing: true,
    rubric: rubricsArray.length ? rubricsArray[0].id : null,
    root_category: rootCategoriesArray.length ? rootCategoriesArray[0].id : null,
    financing_sources: [{
      type: financingIds[0]
    }],
    addresses: [{
      count: 1
    }],
    authors: [{
      id: user.data.id,
      isCurrent: true,
      source: 'search',
      hash: initialAuthorHash
    }],
    article_type: 0,
    text_files: [],
    content_blocks: [
      {
        title: 'Введение'
      },
      {
        title: 'Методы и принципы исследования'
      },
      {
        title: 'Основные результаты'
      },
      {
        title: 'Обсуждение'
      },
      {
        title: 'Заключение'
      },
    ],
    attachments: data.file_atachments || [],
    ...data
  };

  if (initialValues.content_blocks.length > 2) {
    initialValues.content_blocks[0] = {
      ...initialValues.content_blocks[0],
      hint: 'Подсказка про Введение',
      static: true
    };
    initialValues.content_blocks[initialValues.content_blocks.length - 1] = {
      ...initialValues.content_blocks[initialValues.content_blocks.length - 1],
      hint: 'Подсказка про Заключение',
      static: true
    };
  }

  return initialValues;
}

ArticleForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['new'])]),
  onSubmit: PropTypes.func,
  onDraftSubmit: PropTypes.func
};

ArticleForm = withNamespaces()(ArticleForm);

export default connect(mapStateToProps)(ArticleForm);
