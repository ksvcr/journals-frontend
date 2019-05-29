import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import ArticleSpec from '~/components/ArticleSpec/ArticleSpec';
import TagEditor from '~/components/TagEditor/TagEditor';

import * as articlesActions from '~/store/articles/actions';
import getArticleTypes from '~/services/getArticleTypes';

import { getUserData } from '~/store/user/selector';

import './article-info.scss';

class ArticleInfo extends Component {
  handleTagAdd = (article, text) => {
    const { userId, userRole, createArticleTag } = this.props;
    const tagData = { article, text, user: userId, user_role: userRole };
    createArticleTag(article, tagData);
  };

  get specData() {
    const { t, articleData, sitesData, rubricsData } = this.props;
    const site = sitesData[articleData.site];
    const types = getArticleTypes();
    const rubric = rubricsData[articleData.rubric];
    return [
      {
        title: t('for_journals'),
        value: site ? site.name : t('journal_not_found')
      },
      {
        title: t('article_category'),
        value: rubric ? rubric.name : t('rubric_not_found')
      },
      {
        title: t('article_type'),
        value: types[articleData.article_type]
      }
    ];
  }

  render() {
    const { id, articleData, removeArticleTag } = this.props;
    return (
      <div className="article-info">
        <div className="article-info__spec">
          <ArticleSpec data={ this.specData } />
        </div>
        <div className="article-info__tags">
          <TagEditor entityId={ id } data={ articleData.tags }
                     onAdd={ this.handleTagAdd } onRemove={ removeArticleTag } />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { articles, sites, rubrics } = state;
  const { id } = props;
  const { id:userId, role:userRole } = getUserData(state);

  return {
    rubricsData: rubrics.data,
    sitesData: sites.data,
    articleData: articles.isFulfilled && articles.data[id],
    userId,
    userRole
  };
}

const mapDispatchToProps = {
  createArticleTag: articlesActions.createArticleTag,
  removeArticleTag: articlesActions.removeArticleTag
};

ArticleInfo.propTypes = {
  id: PropTypes.number.isRequired
};

ArticleInfo = withNamespaces()(ArticleInfo);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleInfo);
