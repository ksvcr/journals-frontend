import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Menu from '~/components/Menu/Menu';
import ArticleTopTools from '~/components/ArticleTopTools/ArticleTopTools';
import ArticleForm from '~/components/ArticleForm/ArticleForm';
import SiteSelect from '~/components/SiteSelect/SiteSelect';
import CancelLink from '~/components/CancelLink/CancelLink';

import * as languagesActions from '~/store/languages/actions';
import * as rubricsActions from '~/store/rubrics/actions';
import * as categoriesActions from '~/store/categories/actions';
import * as usersActions from '~/store/users/actions';
import * as articlesActions from '~/store/articles/actions';

import { serializeArticleData } from '~/services/articleFormat';
import PreviewLink from '~/components/PreviewLink/PreviewLink';

class ArticlePublish extends Component {
  componentDidMount() {
    this.handleInitialRequest();
  }

  handleInitialRequest = () => {
    const { fetchLanguages } = this.props;
    return Promise.all([
      fetchLanguages(),
      this.handleRequest()
    ]);
  };

  handleRequest = () => {
    const { articleId, fetchArticle, fetchRubrics, fetchCategories, fetchUser } = this.props;
    const promises = [
      fetchRubrics(),
      fetchCategories()
    ];

    if (articleId !== undefined) {
      promises.push(fetchArticle(articleId).then(({ value:articleDate }) => {
        const userIds = articleDate.collaborators.map(item => item.user);
        if (articleDate.author) {
          userIds.push(articleDate.author.user);
        }
        const userPromises = userIds.map(id => fetchUser(id));
        return Promise.all(userPromises);
      }));
    }

    return Promise.all(promises);
  };

  handleSubmit = (formData) => {
    const { articleId, createArticle, editArticle, push } = this.props;
    const data = serializeArticleData({ ...formData, state_article: 'SENT' });

    if (articleId !== undefined) {
      editArticle(articleId, data).then(() => { push('/'); });
    } else {
      createArticle(data).then(() => { push('/'); });
    }
  };

  handleDraftSubmit = (formData) => {
    const { articleId, createArticle, editArticle, push } = this.props;
    const data = serializeArticleData({ ...formData, state_article: 'DRAFT' });
    
    if (articleId !== undefined) {
      editArticle(articleId, data).then(() => { push('/'); });
    } else {
      createArticle(data).then(() => { push('/'); });
    }
  };

  get menuItems() {
    return [
      {
        title: 'Мои статьи',
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
    const { articleId } = this.props;
    return (
      <React.Fragment>
        <aside className="page__sidebar">
          <Menu items={ this.menuItems } />
        </aside>

        <article className="page__content">
          <ArticleTopTools>
            <CancelLink />
            <PreviewLink href="/article/new" />
          </ArticleTopTools>

          <h1 className="page__title">
            { articleId === undefined ? 'Опубликовать статью' : 'Редактировать статью' }
          </h1>

          <div className="page__tools">
            <form className="form">
              <div className="form__field">
                <label htmlFor="sites-list" className="form__label">Для журнала</label>
                <SiteSelect id="sites-list" onChange={ this.handleRequest } />
              </div>
            </form>
          </div>

          <ArticleForm id={ articleId }
                       onSubmit={ this.handleSubmit } onDraftSubmit={  this.handleDraftSubmit }/>
        </article>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  const { match } = props;
  let { articleId } = match.params;
  articleId = articleId ? parseInt(articleId, 10) : articleId;

  return {
    articleId
  };
}

const mapDispatchToProps = {
  push,
  fetchArticle: articlesActions.fetchArticle,
  fetchLanguages: languagesActions.fetchLanguages,
  fetchRubrics: rubricsActions.fetchRubrics,
  fetchCategories: categoriesActions.fetchCategories,
  fetchUser: usersActions.fetchUser,
  createArticle: articlesActions.createArticle,
  editArticle: articlesActions.editArticle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePublish);
