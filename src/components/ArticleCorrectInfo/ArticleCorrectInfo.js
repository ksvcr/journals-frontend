import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TagEditor from '~/components/TagEditor/TagEditor';

import * as articlesActions from '~/store/articles/actions';

import getArticleTypes from '~/services/getArticleTypes';

import './article-correct-info.scss';

class ArticleCorrectInfo extends Component {
  get articleType() {
    const { articleData } = this.props;
    const types = getArticleTypes();

    return types[articleData.article_type];
  }

  get siteName() {
    const { articleData, sitesData } = this.props;
    const site = sitesData[articleData.site];
    return site ? site.name : 'Журнал не найден';
  }

  get category() {
    return 'Категория не указана';
  }

  handleTagAdd = (article, text) => {
    const { userData, createArticleTag } = this.props;
    const tagData = { article, text, user: userData.id, user_role: userData.role };
    createArticleTag(article, tagData);
  };

  render() {
    const { articleData, removeArticleTag } = this.props;

    return (
      <div className="article-correct-info">
        <div className="form">
          <div className="form__field">
            <label htmlFor="site-name" className="form__label form__label_small">Для журнала</label>
            <span id="site-name">{ this.siteName }</span>
          </div>
          <div className="form__field">
            <label htmlFor="category" className="form__label form__label_small">Категория статьи:</label>
            <span id="category">{ this.category }</span>
          </div>
          <div className="form__field">
            <label htmlFor="type" className="form__label form__label_small">Тип статьи:</label>
            <span id="type">{ this.articleType }</span>
          </div>
        </div>

        <div className="article-correct-info__tags">
          <TagEditor entityId={ articleData.id } data={ articleData.tags }
                      onAdd={ this.handleTagAdd } onRemove={ removeArticleTag } />
        </div>
      </div>
    );
  }
}

ArticleCorrectInfo.propTypes = {
  articleId: PropTypes.number,
};

function mapStateToProps(state, props) {
  const { articleId } = props;
  const { articles, sites, user } = state;

  return {
    articleData: articles.data[articleId],
    sitesData: sites.data,
    userData: user.data
  };
}

const mapDispatchToProps = {
  createArticleTag: articlesActions.createArticleTag,
  removeArticleTag: articlesActions.removeArticleTag
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCorrectInfo);
