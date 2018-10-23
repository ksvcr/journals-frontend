import React, { Component } from 'react';
import { submit } from 'redux-form';
import { connect } from 'react-redux';

import ArticleWizard from '~/components/ArticleWizard/ArticleWizard';
import ArticleCommonForm from '~/components/ArticleCommonForm/ArticleCommonForm';
import ArticleAuthorsForm from '~/components/ArticleAuthorsForm/ArticleAuthorsForm';
import Button from '~/components/Button/Button';
import Icon from '~/components/Icon/Icon';

import './article-publish-form.scss';
import './assets/save.svg';

const FORM_NAME = 'article-publish';

class ArticlePublishForm extends Component {
  get wizardSteps() {
    const { onSubmit } = this.props;
    return [
      {
        title: 'Общие сведения',
        component: <ArticleCommonForm formName={ FORM_NAME } onSubmit={ onSubmit } />
      },
      {
        title: 'Авторы',
        component: <ArticleAuthorsForm formName={ FORM_NAME } onSubmit={ onSubmit } />
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

const mapDispatchToProps = {
  submit
};

export default connect(null, mapDispatchToProps)(ArticlePublishForm);
