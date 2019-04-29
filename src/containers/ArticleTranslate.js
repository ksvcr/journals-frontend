import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withNamespaces } from 'react-i18next';

import ArticleTranslateForm from '~/components/ArticleTranslateForm/ArticleTranslateForm';
import * as articlesActions from '~/store/articles/actions';

class ArticleTranslate extends Component {
  componentDidMount() {
    this.handleRequest();
  }

  handleRequest = () => {
    const { articleId, push, fetchArticle, fetchArticleTranslation } = this.props;
    const promises = [];

    if (articleId !== undefined) {
      promises.push(fetchArticle(articleId).then(({ value:articleData }) => {
        let languageCode = articleData.language === 'en' ? 'ru' : 'en';
        fetchArticleTranslation(articleId, languageCode);
      }).catch(() =>{ push('/') }));
    }

    return Promise.all(promises);
  };

  handleSubmit = (formData) => {
    const { articleId, articleData, push, createArticleTranslation, editArticleTranslation } = this.props;
    let language_code = articleData.language === 'en' ? 'ru' : 'en';
    const data = { ...formData, language_code };

    if (articleData.translation) {
      editArticleTranslation(articleId, data).then(() => { push('/'); });
    } else {
      createArticleTranslation(articleId, data).then(() => { push('/'); });
    }
  };

  render() {
    const { t, articleId, isFulfilled } = this.props;

    return (
      <React.Fragment>
        <h1 className="page__title">{ t('article_translation') }</h1>

        { isFulfilled &&
          <ArticleTranslateForm id={ articleId }
                                onSubmit={ this.handleSubmit } />
        }
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  const { articles } = state;
  const { match } = props;
  let { articleId } = match.params;
  articleId = articleId ? parseInt(articleId, 10) : articleId;

  return {
    articleId,
    articleData: articles.isFulfilled && articles.data[articleId],
    isFulfilled: articles.isFulfilled
  };
}

const mapDispatchToProps = {
  push,
  fetchArticle: articlesActions.fetchArticle,
  createArticleTranslation: articlesActions.createArticleTranslation,
  fetchArticleTranslation: articlesActions.fetchArticleTranslation,
  editArticleTranslation: articlesActions.editArticleTranslation
};

ArticleTranslate = withNamespaces()(ArticleTranslate);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleTranslate);
