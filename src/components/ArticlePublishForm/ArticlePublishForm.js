import React, { Component } from 'react';

import ArticleWizard from '~/components/ArticleWizard/ArticleWizard';
import ArticleCommonForm from '~/components/ArticleCommonForm/ArticleCommonForm';
import ArticleAuthorsForm from '~/components/ArticleAuthorsForm/ArticleAuthorsForm';

class ArticlePublishForm extends Component {
  get wizardSteps() {
    const { onSubmit } = this.props;
    return [
      {
        title: 'Общие сведения',
        component: <ArticleCommonForm onSubmit={ onSubmit } />
      },
      {
        title: 'Авторы',
        component: <ArticleAuthorsForm onSubmit={ onSubmit } />
      },
      {
        title: 'Текст статьи',
        component: <div>3</div>
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

  render() {
    return (
      <div className="article-publish-form form">
        <div className="article-publish-form__wizard">
          <ArticleWizard name="article-publish" steps={ this.wizardSteps } />
        </div>
      </div>
    );
  }
}

export default ArticlePublishForm;
