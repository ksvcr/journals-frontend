import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import ArticleForm from '~/components/ArticleForm/ArticleForm';
import ArticleCorrectInfo from '~/components/ArticleCorrectInfo/ArticleCorrectInfo';

import * as languagesActions from '~/store/languages/actions';
import * as rubricsActions from '~/store/rubrics/actions';
import * as categoriesActions from '~/store/categories/actions';
import * as usersActions from '~/store/users/actions';
import * as articlesActions from '~/store/articles/actions';

import { serializeArticleData } from '~/services/articleFormat';

class ArticleCorrect extends Component {
  componentDidMount() {
    this.handleInitialRequest();
  }

  componentDidUpdate() {
    const { notFound, push } = this.props;
    if (notFound) {
      push('/');
    }
  }

  handleInitialRequest = () => {
    const { fetchLanguages } = this.props;
    return Promise.all([
      fetchLanguages(),
      this.handleRequest()
    ]);
  };

  handleRequest = () => {
    const { articleId, siteId, push, fetchArticle, fetchRubrics, fetchCategories, fetchUser } = this.props;
    const promises = [
      fetchRubrics(siteId),
      fetchCategories(siteId),
      fetchArticle(articleId).then(({ value:articleData }) => {
        const userIds = articleData.collaborators.map(item => item.user);

        if (articleData.author) {
          userIds.push(articleData.author.user);
        }

        const userPromises = userIds.map(id => fetchUser(id));
        return Promise.all(userPromises);
      }).catch(() => push('/'))
    ];

    return Promise.all(promises);
  };

  handleSubmit = (formData) => {
    const { siteId, articleId, createArticle, editArticle, push } = this.props;
    const data = serializeArticleData({ ...formData, state_article: 'SENT' });
    // correctArticle(articleId, data).then(() => push('/'));
  };

  handleDraftSubmit = (formData) => {
    const { articleId, siteId, createArticle, editArticle, push } = this.props;
    const data = serializeArticleData({ ...formData, state_article: 'DRAFT' });
    // correctArticle(articleId, data).then(() => push('/'));
  };

  render() {
    const { articleId, isFulfilled } = this.props;
    return (
      <React.Fragment>
        <h1 className="page__title">
          Правка статьи
        </h1>

        {
          isFulfilled &&
          <React.Fragment>
            <div className="page__tools">
              <ArticleCorrectInfo articleId={ articleId } />
            </div>
            <ArticleForm id={ articleId } onSubmit={ this.handleSubmit }
                         onDraftSubmit={ this.handleDraftSubmit }/>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  const { match } = props;
  const { sites, articles, languages, rubrics, categories } = state;
  const articleId = parseInt(match.params.articleId, 10);
  const isFulfilledCommon = languages.isFulfilled && rubrics.isFulfilled && categories.isFulfilled;

  return {
    siteId: sites.current,
    notFound: articles.isFulfilled && !articles.data[articleId],
    isFulfilled: isFulfilledCommon && articles.isFulfilled,
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
)(ArticleCorrect);
