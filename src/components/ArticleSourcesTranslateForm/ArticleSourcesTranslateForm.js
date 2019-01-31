import React, { Component } from 'react';
import { connect } from 'react-redux';
import nanoid from 'nanoid';

import ArticleSourceTranslateItem from '~/components/ArticleSourceTranslateItem/ArticleSourceTranslateItem';

import * as articlesActions from '~/store/articles/actions';

class ArticleSourcesTranslateForm extends Component {
  renderList = () => {
    const { articleData } = this.props;

    return articleData.sources.map((source, index) => {
      const hash = nanoid();
      return (
        <ArticleSourceTranslateItem field={ source } index={ index } key={ index }
                                    hash={ hash } onSubmit={ this.handleSubmit }/>
      );
    })
  };

  handleSubmit = (formData) => {
    const { id, editArticleSource } = this.props;
    return editArticleSource(id, formData);
  };

  render() {
    const { articleData } = this.props;

    return (
      <div  className="article-common-translate-form">
        <h2 className="page__title">Список литературы</h2>
        {
          articleData.sources.length > 0 &&
          <div className="form__field">
            { this.renderList() }
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { id } = props;

  return {
    articleData: state.articles.data[id],
  };
}

const mapDispatchToProps = {
  editArticleSource: articlesActions.editArticleSource
};

export default connect(
  mapStateToProps,
)(ArticleSourcesTranslateForm);
