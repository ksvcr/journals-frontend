import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ArticleSpec from '~/components/ArticleSpec/ArticleSpec';
import TagEditor from '~/components/TagEditor/TagEditor';

import * as articlesActions from '~/store/articles/actions';

import './article-info.scss';
import getArticleTypes from '~/services/getArticleTypes';

class ArticleInfo extends Component {
  handleTagAdd = (article, text) => {
    const { userId, userRole, createArticleTag } = this.props;
    const tagData = { article, text, user: userId, user_role: userRole };
    createArticleTag(article, tagData);
  };

  get specData() {
    const { articleData, sitesData, rubricsData } = this.props;
    const site = sitesData[articleData.site];
    const types = getArticleTypes();

    return [
      {
        title: 'Для журнала',
        value: site ? site.name : 'Журнал не найден'
      },
      {
        title: 'Категория статьи:',
        value: rubricsData[articleData.rubric].name
      },
      {
        title: 'Тип статьи:',
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
  const { user, articles, sites, rubrics } = state;
  const { id } = props;
  return {
    rubricsData: rubrics.data,
    sitesData: sites.data,
    articleData: articles.isFulfilled && articles.data[id],
    userId: user.data.id,
    userRole: user.data.role
  };
}

const mapDispatchToProps = {
  createArticleTag: articlesActions.createArticleTag,
  removeArticleTag: articlesActions.removeArticleTag
};

ArticleInfo.propTypes = {
  id: PropTypes.number.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleInfo);
