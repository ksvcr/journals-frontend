import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, isInvalid, getFormValues, Field } from 'redux-form';
import { connect } from 'react-redux';
import nanoid from 'nanoid';
import { withNamespaces } from 'react-i18next';
import classNames from 'classnames';

import ArticleWizard from '~/components/ArticleWizard/ArticleWizard';
import ArticleCommonForm from '~/components/ArticleCommonForm/ArticleCommonForm';
import ArticleAuthorsForm from '~/components/ArticleAuthorsForm/ArticleAuthorsForm';
import ArticleContentForm from '~/components/ArticleContentForm/ArticleContentForm';
import ArticleFilesForm from '~/components/ArticleFilesForm/ArticleFilesForm';
import ArticleSourcesForm from '~/components/ArticleSourcesForm/ArticleSourcesForm';
import FormError from '~/components/FormError/FormError';
import Checkbox from '~/components/Checkbox/Checkbox';
import Button from '~/components/Button/Button';
import Icon from '~/components/Icon/Icon';

import { getRubricsArray } from '~/store/rubrics/selector';
import { getLanguagesArray } from '~/store/languages/selector';
import { getUserData } from '~/store/user/selector';

import getFinancingIds from '~/services/getFinancingIds';
import { deserializeArticleData } from '~/services/articleFormat';
import * as validate from '~/utils/validate';

import './article-form.scss';
import './assets/save.svg';

const FORM_NAME_BASE = 'article-publish';
const isDev = process.env.NODE_ENV === 'development';

class ArticleForm extends Component {
  get formProps() {
    const { form, id } = this.props;
    return {
      articleId: id,
      formName: form
    };
  }

  get wizardSteps() {
    const { t, userRole } = this.props;

    switch (userRole) {
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
            component: <ArticleFilesForm { ...this.formProps } />
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

  componentDidMount() {
    if (!isDev) {
      this.initAutoSave();
    }
  }

  componentWillUnmount() {
    clearInterval(this.autoSaveInterval);
  }

  initAutoSave = () => {
    const { onAutoSave, articleData } = this.props;
    const isDraft = articleData && articleData.state_article === 'DRAFT';
    // Автоматическое сохранение
    this.autoSaveInterval = setInterval(() => {
      const { formValues } = this.props;

      if(formValues && formValues.title && (!articleData || isDraft)) {
        onAutoSave(formValues);
      }
    }, 30000);
  };

  handleDraftSubmit = () => {
    const { formValues, form, onDraftSubmit } = this.props;
    onDraftSubmit(formValues, form);
  };

  handleSubmit = (formData) => {
    const { form, onSubmit } = this.props;
    onSubmit(formData, form);
  };

  renderTools = () => {
    const { id, articleData, handleSubmit, isInvalidForm, isPending, t } = this.props;
    const isDraft = articleData && articleData.state_article === 'DRAFT';
    const iconClasses = classNames('article-form__save-icon',
      { 'article-form__save-icon_disabled': isPending });
    return (
      <React.Fragment>
        { (id === 'new' || isDraft) &&
          <Button onClick={ this.handleDraftSubmit } disabled={ isPending }>
            <Icon name="save" className={ iconClasses } />
            { t('save_as_draft') }
          </Button>
        }

        <Button className="button_orange" onClick={ handleSubmit(this.handleSubmit) }
                disabled={ isInvalidForm || isPending } >
          { id === 'new' || isDraft ? t('send_article') : t('save_article') }
        </Button>
      </React.Fragment>
    );
  };

  renderCommon = () => {
    const { t } = this.props;
    return (
      <React.Fragment>
        <hr className="article-form__divider" />
        <div className="form__field">
          <Field name="publicationAllowed" validate={ [validate.required] } component={ Checkbox }>
            { t('publication_allowed') }
          </Field>
          <div className="article-form__allowed-description">
            { t('article_send_agreement') }
          </div>
        </div>
      </React.Fragment>
    );
  };

  render() {
    const { articlesError, isRejected } = this.props;
    return (
      <div className="article-form">
        <div className="article-form__wizard">
          <ArticleWizard steps={ this.wizardSteps }
                         common={ this.renderCommon }
                         tools={ this.renderTools } />
          { isRejected &&
            <FormError data={ articlesError }/>
          }
        </div>
      </div>
    );
  }
}

ArticleForm = reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(ArticleForm);

const initialAuthorHash = nanoid();

function mapStateToProps(state, props) {
  const { articles } = state;
  const { id='new' } = props;
  const formName = `${FORM_NAME_BASE}-${id}`;
  const isInvalidForm = isInvalid(formName)(state);
  const formValues = getFormValues(formName)(state);
  const { role:userRole } = getUserData(state);
  const isCorrector = userRole === 'CORRECTOR';
  const articleData = articles.data[id];

  return {
    id,
    formValues,
    isInvalidForm,
    userRole,
    isPending: articles.isPending,
    form: formName,
    isProofreading: isCorrector && articleData.state_article === 'AWAIT_PROOFREADING',
    initialValues: getInitialValues(state, props),
    isRejected: articles.isRejected,
    articlesError: articles.error,
    articleData: articles.data[id]
  };
}

function getRubricSet(rubric, rubricsData) {
  const rubricSet = [];
  
  return setLevel(rubric);

  function setLevel(rubric) {
    rubricSet.unshift(rubric);
    const currentRubric = rubricsData[rubric];
    if (currentRubric.parent) {
      return setLevel(currentRubric.parent)
    } else {
      return rubricSet;
    }
  }
}

function getInitialValues(state, props) {
  const { articles, rubrics } = state;
  const { id } = props;
  const rubricsArray = getRubricsArray(state);
  const languagesArray = getLanguagesArray(state);
  const financingIds = getFinancingIds();
  const data = deserializeArticleData(articles.data[id]);
  const defaultRubric = rubricsArray.find(item => item.parent === null);
  const userData = getUserData(state);

  const initialValues = {
    language: languagesArray.length ? languagesArray[0].twochar_code : null,
    is_conflict_interest: true,
    has_financing: true,
    rubric_set: data.rubric ? getRubricSet(data.rubric, rubrics.data) : [defaultRubric.id],
    financing_sources: [{
      type: financingIds[0]
    }],
    authors: [{
      id: userData.id,
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
    file_atachments: data.file_atachments || [],
    list_literature_file: data.list_literature_file,
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
  onDraftSubmit: PropTypes.func,
  onAutoSave: PropTypes.func,
  autoSaveTimer: PropTypes.number,
};

ArticleForm.defaultProps = {
  autoSaveTimer: 30,
};

ArticleForm = withNamespaces()(ArticleForm);

export default connect(mapStateToProps)(ArticleForm);
