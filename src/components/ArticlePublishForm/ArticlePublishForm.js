import React, { Component } from 'react';
import { submit } from 'redux-form';
import { connect } from 'react-redux';
import nanoid from 'nanoid';

import ArticleWizard from '~/components/ArticleWizard/ArticleWizard';
import ArticleCommonForm from '~/components/ArticleCommonForm/ArticleCommonForm';
import ArticleAuthorsForm from '~/components/ArticleAuthorsForm/ArticleAuthorsForm';
import ArticleContentForm from '~/components/ArticleContentForm/ArticleContentForm';
import Button from '~/components/Button/Button';
import Icon from '~/components/Icon/Icon';

import './article-publish-form.scss';
import './assets/save.svg';

import { getRubricsArray } from '~/store/rubrics/selector';
import { getLanguagesArray } from '~/store/languages/selector';
import {  getRootCategoriesArray } from '~/store/categories/selector';

import getFinancingIds from '~/services/getFinancingIds';

const FORM_NAME = 'article-publish';

class ArticlePublishForm extends Component {
  get formProps() {
    const { onSubmit, initialValues } = this.props;
    return {
      formName: FORM_NAME,
      initialValues,
      onSubmit
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
        component: <div>4</div>
      },
      {
        title: 'Список литературы',
        component: <div>5</div>
      }
    ];
  }

  handleSubmit = () => {
    const { submit } = this.props;
    submit(FORM_NAME);
  };

  renderTools = () => {
    return (
      <React.Fragment>
        <Button onClick={ this.handleSubmit }>
          <Icon name="save" className="article-publish-form__save-icon" />
          Сохранить как черновик
        </Button>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="article-publish-form form">
        <div className="article-publish-form__wizard">
          <ArticleWizard steps={ this.wizardSteps } tools={ this.renderTools } />
        </div>
      </div>
    );
  }
}

const initialAuthorHash = nanoid();

function mapStateToProps(state) {
  const { user } = state;
  const rootCategoriesArray = getRootCategoriesArray(state);
  const rubricsArray = getRubricsArray(state);
  const languagesArray = getLanguagesArray(state);
  const financingIds = getFinancingIds();

  return {
    initialValues: {
      language: languagesArray.length ? languagesArray[0].id : null,
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
      }]
    }
  };
}

const mapDispatchToProps = {
  submit
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePublishForm);
