import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, isInvalid, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import nanoid from 'nanoid';

import ArticleWizard from '~/components/ArticleWizard/ArticleWizard';
import ArticleCommonForm from '~/components/ArticleCommonForm/ArticleCommonForm';
import ArticleAuthorsForm from '~/components/ArticleAuthorsForm/ArticleAuthorsForm';
import ArticleContentForm from '~/components/ArticleContentForm/ArticleContentForm';
import ArticleSourcesForm from '~/components/ArticleSourcesForm/ArticleSourcesForm';

import Button from '~/components/Button/Button';
import Icon from '~/components/Icon/Icon';

import './article-form.scss';
import './assets/save.svg';

import { getRubricsArray } from '~/store/rubrics/selector';
import { getLanguagesArray } from '~/store/languages/selector';
import {  getRootCategoriesArray } from '~/store/categories/selector';

import getFinancingIds from '~/services/getFinancingIds';
import { deserializeArticleData } from '~/services/article';


const FORM_NAME = 'article-publish';

class ArticleForm extends Component {
  get formProps() {
    return {
      formName: FORM_NAME
    };
  }

  get wizardSteps() {
    return [
      {
        title: 'Общие сведения',
        component: <ArticleCommonForm { ...this.formProps } />
      },
      {
        title: 'Авторы',
        component: <ArticleAuthorsForm { ...this.formProps } />
      },
      {
        title: 'Текст статьи',
        component: <ArticleContentForm { ...this.formProps } />
      },
      {
        title: 'Файлы к статье',
        component: <div>Раздел в разработке</div>
      },
      {
        title: 'Список литературы',
        component: <ArticleSourcesForm { ...this.formProps } />
      }
    ];
  }

  handleDraftSubmit = () => {
    const { formValues, onDraftSubmit } = this.props;
    onDraftSubmit(formValues);
  };

  renderTools = () => {
    const { handleSubmit, isInvalidForm } = this.props;
    return (
      <React.Fragment>
        <Button onClick={ this.handleDraftSubmit }>
          <Icon name="save" className="article-publish-form__save-icon" />
          Сохранить как черновик
        </Button>
        <Button className="button_orange" onClick={ handleSubmit } disabled={ isInvalidForm } >
          Отправить статью
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
  form: FORM_NAME,
  destroyOnUnmount: false,
  enableReinitialize: true
})(ArticleForm);

const initialAuthorHash = nanoid();
const initialSourceHash = nanoid();

function mapStateToProps(state, props) {
  const isInvalidForm = isInvalid(FORM_NAME)(state);
  const formValues = getFormValues(FORM_NAME)(state);

  return {
    formValues,
    isInvalidForm,
    initialValues: getInitialValues(state, props)
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

  return {
    language: languagesArray.length ? languagesArray[0].id : null,
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
    blocks: [
      {
        title: 'Введение',
        hint: 'Подсказка про Введение',
        static: true,
        content: {"blocks":[{"key":"525dr","text":"sdfsdf sdfsdf dsfsdf sdsf sdfsdfsdf","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":6,"style":"CUSTOM_COLOR_rgba(22,107,28,1)"},{"offset":7,"length":6,"style":"CUSTOM_BACKGROUND_rgba(255,0,0,1)"},{"offset":26,"length":9,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"37bso","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ag5ji","text":" ","type":"block-table","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}}],"entityMap":{"0":{"type":"block-table","mutability":"IMMUTABLE","data":{"rows":[[{"blocks":[{"key":"dskf2","text":"колонка1","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}},{"blocks":[{"key":"53nat","text":"колонка12","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}]],"numberOfColumns":2,"title":"Заголовок таблицы1","additional":"1","keywords":"2"}}}}
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
        title: 'Заключение',
        hint: 'Подсказка про Заключение',
        static: true
      },
    ],
    sources: [{
      last_name: 'Куклин',
      first_name: 'С. В.',
      title: 'Название',
      english_title: 'Name',
      isEdit: false,
      hash: initialSourceHash
    }],
    ...data
  };
}

ArticleForm.propTypes = {
  id: PropTypes.number,
  onSubmit: PropTypes.func,
  onDraftSubmit: PropTypes.func
};

export default connect(mapStateToProps)(ArticleForm);
