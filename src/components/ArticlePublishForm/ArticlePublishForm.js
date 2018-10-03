import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import ArticleWizard from '~/components/ArticleWizard/ArticleWizard';
import ArticleCommon from '~/components/ArticleCommon/ArticleCommon';

class ArticlePublishForm extends Component {
  get wizardSteps() {
    return [
      {
        title: 'Общие сведения',
        component: <ArticleCommon />
      },
      {
        title: 'Авторы',
        component: <div>2</div>
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
      <form className="article-publish-form form">
        <div className="article-publish-form__wizard">
          <ArticleWizard steps={ this.wizardSteps } />
        </div>
      </form>
    );
  }
}

ArticlePublishForm = reduxForm({
  form: 'article-publish',
  destroyOnUnmount: false,
  enableReinitialize: true,
  initialValues: {
    financing_sources: [{}]
  }
})(ArticlePublishForm);

export default connect()(ArticlePublishForm);
