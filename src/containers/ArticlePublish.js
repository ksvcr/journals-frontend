import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import ArticleTopTools from '~/components/ArticleTopTools/ArticleTopTools';
import SiteSelect from '~/components/SiteSelect/SiteSelect';
import CancelLink from '~/components/CancelLink/CancelLink';
import PreviewLink from '~/components/PreviewLink/PreviewLink';
import ArticleForm from '~/components/ArticleForm/ArticleForm';
import ArticleInfo from '~/components/ArticleInfo/ArticleInfo';

import * as languagesActions from '~/store/languages/actions';
import * as rubricsActions from '~/store/rubrics/actions';
import * as categoriesActions from '~/store/categories/actions';
import * as usersActions from '~/store/users/actions';
import * as articlesActions from '~/store/articles/actions';
import * as countriesActions from '~/store/countries/actions';

import { serializeArticleData } from '~/services/articleFormat';

class ArticlePublish extends Component {
  componentDidMount() {
    this.handleInitialRequest();
  }

  componentDidUpdate() {
    const { articleId, notFound, push } = this.props;
    if (articleId !== undefined && notFound) {
      push('/');
    }
  }

  handleInitialRequest = () => {
    const { fetchLanguages, fetchCountries } = this.props;
    return Promise.all([
      fetchLanguages(),
      // fetchCountries({ name: "Б" }),
      fetchCountries({ limit: 5 }),
      this.handleRequest()
    ]);
  };

  handleRequest = () => {
    const { articleId, siteId, push, fetchArticle, fetchRubrics, fetchCategories, fetchUser } = this.props;
    const promises = [
      fetchRubrics(siteId),
      fetchCategories(siteId)
    ];

    if (articleId !== undefined) {
      promises.push(fetchArticle(articleId).then(({ value:articleData }) => {
        const userIds = articleData.collaborators.map(item => item.user);
        if (articleData.author) {
          userIds.push(articleData.author.user);
        }
        const userPromises = userIds.map(id => fetchUser(id));
        return Promise.all(userPromises);
      }).catch(() =>{ push('/') }));
    }

    return Promise.all(promises);
  };

  handleSubmit = (formData) => {
    const { siteId, articleId, createArticle, editArticle, push } = this.props;
    const data = serializeArticleData({ ...formData, state_article: 'SENT' });

    if (articleId !== undefined) {
      editArticle(articleId, data).then(() => { push('/'); });
    } else {
      createArticle(siteId, data).then(() => { push('/'); });
    }
  };

  handleDraftSubmit = (formData) => {
    const { articleId, siteId, createArticle, editArticle, push } = this.props;
    const data = serializeArticleData({ ...formData, state_article: 'DRAFT' });

    if (articleId !== undefined) {
      editArticle(articleId, data).then(() => { push('/'); });
    } else {
      createArticle(siteId, data).then(() => { push('/'); });
    }
  };

  get articleInfo() {
    const { articleData, sitesData } = this.props;
    return [
      {
        title: 'Для журнала',
        value: sitesData[articleData.site].name
      }
    ];
  }

  render() {
    const { articleId, isFulfilled, userRole, articleData } = this.props;
    const isEdit = articleId !== undefined;

    return isFulfilled && (
      <React.Fragment>
        <ArticleTopTools>
          <CancelLink />
          <PreviewLink href="/article/new" />
        </ArticleTopTools>

        <h1 className="page__title">
          { isEdit ? 'Опубликовать статью' : 'Редактировать статью' }
        </h1>

        <div className="page__tools">
          { userRole === 'AUTHOR' &&
            <form className="form">
              <div className="form__field">
                <label htmlFor="sites-list" className="form__label">Для журнала</label>
                <SiteSelect id="sites-list" onChange={ this.handleRequest } />
              </div>
            </form>
          }

          { isEdit && userRole === 'REDACTOR' &&
            <ArticleInfo id={ articleId } specData={ this.articleInfo }
                         tags={ articleData.tags } />
          }
        </div>

        <ArticleForm id={ articleId }
                     onSubmit={ this.handleSubmit } onDraftSubmit={ this.handleDraftSubmit }/>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  const { match } = props;
  const { sites, articles, languages, rubrics, categories, user } = state;
  let { articleId } = match.params;
  articleId = articleId ? parseInt(articleId, 10) : articleId;

  const isFulfilledCommon = languages.isFulfilled && rubrics.isFulfilled && categories.isFulfilled && sites.isFulfilled;
  return {
    siteId: sites.current,
    sitesData: sites.data,
    userRole: user.data.role,
    articleData: articles.isFulfilled && articles.data[articleId],
    notFound: articles.isFulfilled && !articles.data[articleId],
    isFulfilled: (isFulfilledCommon && articleId === undefined) || (isFulfilledCommon && articles.isFulfilled),
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
  editArticle: articlesActions.editArticle,
  fetchCountries: countriesActions.fetchCountries,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePublish);
