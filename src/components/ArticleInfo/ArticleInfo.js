import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArticleSpec from '~/components/ArticleSpec/ArticleSpec';
import TagEditor from '~/components/TagEditor/TagEditor';

import * as articlesActions from '~/store/articles/actions';

import './article-info.scss';

class ArticleInfo extends Component {
  handleTagAdd = (article, text) => {
    const { userId, userRole, createArticleTag } = this.props;
    const tagData = { article, text, user: userId, user_role: userRole };
    createArticleTag(article, tagData);
  };

  render() {
    const { specData, id, tags, removeArticleTag } = this.props;
    return (
      <div className="article-info">
        <div className="article-info__spec">
          <ArticleSpec data={ specData } />
        </div>
        <div className="article-info__tags">
          <TagEditor entityId={ id } data={ tags }
                     onAdd={ this.handleTagAdd } onRemove={ removeArticleTag } />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    userId: user.data.id,
    userRole: user.data.role
  };
}

const mapDispatchToProps = {
  createArticleTag: articlesActions.createArticleTag,
  removeArticleTag: articlesActions.removeArticleTag
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleInfo);
