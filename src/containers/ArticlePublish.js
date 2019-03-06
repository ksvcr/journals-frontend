import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { reset, destroy } from 'redux-form';
import { withNamespaces } from 'react-i18next';

import ArticleTopTools from '~/components/ArticleTopTools/ArticleTopTools';
import SiteSelect from '~/components/SiteSelect/SiteSelect';
import CancelLink from '~/components/CancelLink/CancelLink';
import PreviewLink from '~/components/PreviewLink/PreviewLink';
import ArticleForm from '~/components/ArticleForm/ArticleForm';
import ReviewsDialogList from '~/components/ReviewsDialogList/ReviewsDialogList';
import ArticleInfo from '~/components/ArticleInfo/ArticleInfo';

import * as languagesActions from '~/store/languages/actions';
import * as rolesActions from '~/store/roles/actions';
import * as rubricsActions from '~/store/rubrics/actions';
import * as categoriesActions from '~/store/categories/actions';
import * as usersActions from '~/store/users/actions';
import * as articlesActions from '~/store/articles/actions';
import * as lawtypesActions from '~/store/lawtypes/actions';
import * as countriesActions from '~/store/countries/actions';

import { serializeArticleData } from '~/services/articleFormat';
import apiClient from '~/services/apiClient';
import PreliminaryReviewComment from '~/components/PreliminaryReviewComment/PreliminaryReviewComment';

class ArticlePublish extends Component {
  constructor(props) {
    super(props);
    const { articleId } = this.props;

    this.tempArticleId = articleId;
  };

  componentDidMount() {
    this.handleInitialRequest();
  }

  componentDidUpdate() {
    const { notFound, push, isEdit } = this.props;
    if (isEdit && notFound) {
      push('/');
    }
  }

  componentWillUnmount() {
    if (this.lockInterval) {
      clearInterval(this.lockInterval);
    }
  }

  handleInitialRequest = () => {
    const { isEdit, articleId, fetchLanguages, fetchLawtypes } = this.props;
    const promises = [fetchLanguages(), fetchLawtypes(), this.handleRequest()];

    if (isEdit) {
      // Блокирование статьи для других пользователей, каждую минуту
      promises.push(apiClient.lockArticle(articleId));
      this.lockInterval = setInterval(() => {
        apiClient.lockArticle(articleId);
      }, 60000);
    }

    return Promise.all(promises).catch(error => console.error(error));
  };

  handleRequest = () => {
    const { articleId, siteId, isEdit, push, fetchArticle, fetchRubrics,
            fetchCategories, fetchCountries, fetchUser, fetchRoles, fetchArticlePrinted } = this.props;
    const promises = [fetchCountries()];

    if (isEdit) {
      promises.push(
        fetchArticle(articleId)
          .then(({ value: articleData }) => {
            const userIds = articleData.collaborators.map(item => item.user.id);
            if (articleData.author) {
              userIds.push(articleData.author.user.id);
            }
            const userPromises = userIds.map(id => fetchUser(id));
            return Promise.all([
              ...userPromises,
              fetchRubrics(articleData.site),
              fetchCategories(articleData.site)
            ]);
          })
      );
      promises.push(fetchArticlePrinted(articleId));
    } else {
      promises.push(fetchRubrics(siteId));
      promises.push(fetchCategories(siteId));
      promises.push(fetchRoles(siteId));
    }

    return Promise.all(promises)
      .catch(() => {
        push('/');
      });
  };

  handleSubmit = (formData, formName) => {
    const { siteId, isEdit, createArticle,
            editArticle, push, destroy } = this.props;
    const data = serializeArticleData(formData);

    if (!data.conflict_interest) {
      delete data.conflict_interest;
    }

    if (isEdit) {
      switch (data.state_article) {
        case 'DRAFT':
          // Отправка
          data.state_article = 'SENT';
          break;
        case 'REVISION':
          // Доработка
          data.state_article = 'MODIFIED';
          break;
        case 'AWAIT_PROOFREADING':
          // Корректировка
          data.state_article = 'AWAIT_TRANSLATE';
          break;
        default:
          delete data.state_article;
      }

      editArticle(this.tempArticleId, data)
        .then(() => {
          destroy(formName);
          push('/');
        })
        .catch(error => console.error(error));
    } else {
      data.state_article = 'SENT';
      createArticle(siteId, data)
        .then(() => {
          destroy(formName);
          push('/');
        })
        .catch(error => console.error(error));
    }
  };

  handleDraftSubmit = (formData, formName) => {
    const { siteId, createArticle, editArticle, push, reset } = this.props;
    const data = serializeArticleData(formData);

    if (this.tempArticleId !== undefined) {
      editArticle(this.tempArticleId, data)
        .then(() => {
          reset(formName);
          push('/');
        })
        .catch(error => console.error(error));
    } else {
      data.state_article = 'DRAFT';
      createArticle(siteId, data)
        .then(() => {
          reset(formName);
          push('/');
        })
        .catch(error => console.error(error));
    }
  };

  handleEditArticleReview = (reviewId, formData) => {
    const { articleId, editArticleReview } = this.props;
    editArticleReview(articleId, reviewId, formData);
  };

  handleAutoSave = (formData) => {
    const { siteId, createArticle, editArticle } = this.props;

    const data = serializeArticleData(formData);
    data.state_article = 'DRAFT';

    if (this.tempArticleId !== undefined) {
      editArticle(this.tempArticleId, data);
    } else {
      createArticle(siteId, data, res => {
        this.tempArticleId = res.id;
      });
    }
  };

  render() {
    const { articleId, isFulfilled, articleStatus, userRole,
            articleData, isEdit, t } = this.props;
    const editText = userRole === 'CORRECTOR' ? t('correct_article') : t('edit_article');
    const isShowSiteChange = userRole === 'AUTHOR';
    const isShowArticleInfo = Boolean(~['REDACTOR', 'CORRECTOR'].indexOf(userRole)) && isEdit;

    return (
      isFulfilled && (
        <React.Fragment>
          { !isEdit && (
            <ArticleTopTools>
              <CancelLink />
              <PreviewLink href="/article/new" />
            </ArticleTopTools>
          ) }

          <h1 className="page__title">
            { isEdit ? editText : t('publish_article') }
          </h1>

          <div className="page__tools">
            { isShowSiteChange && (
              <form className="form">
                <div className="form__field">
                  <label htmlFor="sites-list" className="form__label">
                    { t('for_journals') }
                  </label>
                  <SiteSelect id="sites-list" onChange={ this.handleRequest } />
                </div>
              </form>
            ) }

            { isShowArticleInfo && <ArticleInfo id={ articleId } /> }
          </div>

          { articleStatus === 'REVISION' && (
            <ReviewsDialogList articleId={ articleId }
                               reviews={ articleData.reviews }
                               onSubmit={ this.handleEditArticleReview }
            />
          ) }

          { articleStatus === 'PRELIMINARY_REVISION' &&
            <PreliminaryReviewComment review={ articleData.redactor_review } />
          }

          <ArticleForm id={ articleId } onSubmit={ this.handleSubmit }
                       onDraftSubmit={ this.handleDraftSubmit }
                       onAutoSave={ this.handleAutoSave } />
        </React.Fragment>
      )
    );
  }
}

function mapStateToProps(state, props) {
  const { match } = props;
  const { sites, articles, languages, rubrics,
          categories, user, countries } = state;

  let { articleId } = match.params;
  articleId = articleId ? parseInt(articleId, 10) : articleId;

  const articleData = articleId && articles.data[articleId];
  const articleStatus = articleData && articleData.state_article;
  const isEdit = articleId !== undefined;

  const isFulfilledCommon =
    languages.isFulfilled &&
    rubrics.isFulfilled &&
    countries.isFulfilled &&
    categories.isFulfilled &&
    sites.isFulfilled;

  return {
    isEdit,
    siteId: isEdit && articleData ? articleData.site : sites.current,
    userId: user.data.id,
    userRole: user.data.role,
    notFound: articles.isFulfilled && !articles.data[articleId],
    isFulfilled:
      (isFulfilledCommon && !isEdit) ||
      (isFulfilledCommon && articles.isFulfilled),
    articleId,
    articleData,
    articleStatus
  };
}

const mapDispatchToProps = {
  push,
  reset, destroy,
  fetchArticle: articlesActions.fetchArticle,
  fetchLanguages: languagesActions.fetchLanguages,
  fetchRubrics: rubricsActions.fetchRubrics,
  fetchCategories: categoriesActions.fetchCategories,
  fetchUser: usersActions.fetchUser,
  createArticle: articlesActions.createArticle,
  editArticle: articlesActions.editArticle,
  editArticleReview: articlesActions.editArticleReview,
  fetchLawtypes: lawtypesActions.fetchLawtypes,
  fetchCountries: countriesActions.fetchCountries,
  fetchRoles: rolesActions.fetchRoles,
  fetchArticlePrinted: articlesActions.fetchArticlePrinted
};

ArticlePublish = withNamespaces()(ArticlePublish);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePublish);
