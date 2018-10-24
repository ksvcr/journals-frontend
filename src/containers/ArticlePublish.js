import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from '~/components/Menu/Menu';
import ArticleTopTools from '~/components/ArticleTopTools/ArticleTopTools';
import ArticlePublishForm from '~/components/ArticlePublishForm/ArticlePublishForm';
import SiteSelect from '~/components/SiteSelect/SiteSelect';

import * as languagesActions from '~/store/languages/actions';
import * as rubricsActions from '~/store/rubrics/actions';
import * as categoriesActions from '~/store/categories/actions';
import * as usersActions from '~/store/users/actions';
import * as articlesActions from '~/store/articles/actions';

import { serializeArticleData } from '~/services/article';

class ArticlePublish extends Component {
  componentDidMount() {
    this.handleInitialRequest();
  }

  handleInitialRequest = () => {
    const { fetchLanguages, fetchUsers } = this.props;
    return Promise.all([
      fetchLanguages(),
      fetchUsers(),
      this.handleRequest()
    ]);
  };

  handleRequest = () => {
    const { fetchRubrics, fetchCategories } = this.props;
    return Promise.all([
      fetchRubrics(),
      fetchCategories()
    ]);
  };

  handleSubmit = (formData) => {
    const { createArticle } = this.props;
    const data = serializeArticleData(formData);
    createArticle(data);
  };

  get menuItems() {
    return [
      {
        title: 'Мои статью',
        href: '/'
      },
      {
        title: 'Мои скидки',
        href: '/second'
      },
      {
        title: 'Настройки',
        href: '/'
      }
    ];
  }

  render() {
    return (
      <React.Fragment>
        <aside className="page__sidebar">
          <Menu items={ this.menuItems } />
        </aside>

        <article className="page__content">
          <ArticleTopTools />
          <h1 className="page__title">Опубликовать статью</h1>

          <div className="page__tools">
            <form className="form">
              <div className="form__field">
                <label htmlFor="sites-list" className="form__label">Для журнала</label>
                <SiteSelect id="sites-list" onChange={ this.handleRequest } />
              </div>
            </form>
          </div>

          <ArticlePublishForm onSubmit={ this.handleSubmit } />
        </article>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  fetchLanguages: languagesActions.fetchLanguages,
  fetchRubrics: rubricsActions.fetchRubrics,
  fetchCategories: categoriesActions.fetchCategories,
  fetchUsers: usersActions.fetchUsers,
  createArticle: articlesActions.createArticle
};

export default connect(
  null,
  mapDispatchToProps
)(ArticlePublish);
