import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { reset } from 'redux-form';
import { withNamespaces } from 'react-i18next';

import ArticleTopTools from '~/components/ArticleTopTools/ArticleTopTools';
import SiteSelect from '~/components/SiteSelect/SiteSelect';
import CancelLink from '~/components/CancelLink/CancelLink';
import PreviewLink from '~/components/PreviewLink/PreviewLink';
import ArticleForm from '~/components/ArticleForm/ArticleForm';
import ReviewsDialogList from '~/components/ReviewsDialogList/ReviewsDialogList';
import ArticleInfo from '~/components/ArticleInfo/ArticleInfo';

import * as languagesActions from '~/store/languages/actions';
import * as rubricsActions from '~/store/rubrics/actions';
import * as categoriesActions from '~/store/categories/actions';
import * as usersActions from '~/store/users/actions';
import * as articlesActions from '~/store/articles/actions';
import * as lawtypesActions from '~/store/lawtypes/actions';
import * as countriesActions from '~/store/countries/actions';

import { serializeArticleData } from '~/services/articleFormat';
import apiClient from '~/services/apiClient';

class ArticlePublish extends Component {
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
    const promises = [
      fetchLanguages(),
      fetchLawtypes(),
      this.handleRequest()
    ];

    if (isEdit) {
      // Блокирование статьи для других пользователей, каждую минуту
      promises.push(apiClient.lockArticle(articleId));
      this.lockInterval = setInterval(() => {
        apiClient.lockArticle(articleId)
      }, 60000);
    }

    return Promise.all(promises).catch(error => console.error(error));
  };

  handleRequest = () => {
    const { articleId, siteId, isEdit, push, fetchArticle, fetchRubrics,
            fetchCategories, fetchCountries, fetchUser } = this.props;

    const promises = [
      fetchCountries()
    ];

    if (isEdit) {
      promises.push(fetchArticle(articleId).then(({ value:articleData }) => {
        const userIds = articleData.collaborators.map(item => item.user);
        if (articleData.author) {
          userIds.push(articleData.author.user);
        }
        const userPromises = userIds.map(id => fetchUser(id));
        return Promise.all([ ...userPromises, fetchRubrics(articleData.site), fetchCategories(articleData.site)]);
      }).catch(() =>{ push('/') }));
    } else {
      promises.push(fetchRubrics(siteId));
      promises.push(fetchCategories(siteId));
    }

    return Promise.all(promises);
  };

  handleSubmit = (formData, formName) => {
    const { siteId, articleId, userId, isEdit, userRole,
            createArticle, editArticle, push, reset } = this.props;
    const data = serializeArticleData(formData);

    if (!data.conflict_interest) {
      delete data.conflict_interest;
    }

    data.state_article = 'SENT';

    if (isEdit) {
      if (userId === data.author.user && data.state_article === 'REVISION') {
        // Доработка
        data.state_article = 'MODIFIED';
      } else if (userRole === 'CORRECTOR') {
        // Корректировка
        data.state_article = 'AWAIT_TRANSLATE';
      }
      editArticle(articleId, data).then(() => {
        reset(formName);
        push('/');
      }).catch(error => console.error(error));
    } else {
      createArticle(siteId, data).then(() => {
        reset(formName);        
        push('/');
      }).catch(error => console.error(error));
    }
  };

  handleDraftSubmit = (formData, formName) => {
    const { articleId, siteId, createArticle, editArticle, push, reset } = this.props;
    const data = serializeArticleData(formData);

    if (articleId !== undefined) {
      editArticle(articleId, data).then(() => {
        reset(formName);
        push('/');
      }).catch(error => console.error(error));
    } else {
      data.state_article = 'DRAFT';
      createArticle(siteId, data).then(() => {
        reset(formName);
        push('/');
      }).catch(error => console.error(error));
    }
  };

  handleEditArticleReview = (reviewId, formData) => {
    const { articleId, editArticleReview } = this.props;
    editArticleReview(articleId, reviewId, formData);
  };

  render() {
    const { articleId, isFulfilled, articleStatus,
            userRole, articleData, isEdit, t } = this.props;
    const isStatusRework = articleStatus === 'PRELIMINARY_REVISION' ||
                           articleStatus === 'REVISION';
    const editText = userRole === 'CORRECTOR' ? t('correct_article') : t('edit_article');
    const isShowSiteChange = userRole === 'AUTHOR';
    const isShowArticleInfo = Boolean(~['REDACTOR', 'CORRECTOR'].indexOf(userRole)) && isEdit;

    return isFulfilled && (
      <React.Fragment>
        { !isEdit &&
          <ArticleTopTools>
            <CancelLink />
            <PreviewLink href="/article/new" />
          </ArticleTopTools>
        }

        <h1 className="page__title">
          { isEdit ? editText : t('publish_article') }
        </h1>

        <div className="page__tools">
          { isShowSiteChange &&
            <form className="form">
              <div className="form__field">
                <label htmlFor="sites-list" className="form__label">
                  { t('for_journals') }
                </label>
                <SiteSelect id="sites-list" onChange={ this.handleRequest } />
              </div>
            </form>
          }

          { isShowArticleInfo &&
            <ArticleInfo id={ articleId } />
          }
        </div>

        {
          isStatusRework &&
            <ReviewsDialogList articleId={ articleId } reviews={ articleData.reviews }
                               onSubmit={ this.handleEditArticleReview }/>
        }

        <ArticleForm id={ articleId }
                     onSubmit={ this.handleSubmit } onDraftSubmit={ this.handleDraftSubmit }/>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  const { match } = props;
  const { sites, articles, languages, rubrics, categories, user, countries } = state;
  let { articleId } = match.params;
  articleId = articleId ? parseInt(articleId, 10) : articleId;
  const articleData = articleId && articles.data[articleId];
  const articleStatus = articleData && articleData.state_article;
  const isEdit = articleId !== undefined;
  const isFulfilledCommon = languages.isFulfilled && rubrics.isFulfilled && countries.isFulfilled &&
                            categories.isFulfilled && sites.isFulfilled;
  return {
    isEdit,
    siteId: isEdit && articleData ? articleData.site : sites.current,
    userId: user.data.id,
    userRole: user.data.role,
    notFound: articles.isFulfilled && !articles.data[articleId],
    isFulfilled: (isFulfilledCommon && !isEdit) || (isFulfilledCommon && articles.isFulfilled),
    articleId,
    articleData,
    articleStatus
  };
}

const mapDispatchToProps = {
  push,
  reset,
  fetchArticle: articlesActions.fetchArticle,
  fetchLanguages: languagesActions.fetchLanguages,
  fetchRubrics: rubricsActions.fetchRubrics,
  fetchCategories: categoriesActions.fetchCategories,
  fetchUser: usersActions.fetchUser,
  createArticle: articlesActions.createArticle,
  editArticle: articlesActions.editArticle,
  editArticleReview: articlesActions.editArticleReview,
  fetchLawtypes: lawtypesActions.fetchLawtypes,
  fetchCountries: countriesActions.fetchCountries
};

ArticlePublish = withNamespaces()(ArticlePublish);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePublish);
