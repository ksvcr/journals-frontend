import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArticleSourceTranslateItem from '~/components/ArticleSourceTranslateItem/ArticleSourceTranslateItem';

class ArticleSourcesTranslateForm extends Component {
  renderSourceList = () => {
    const { articleData } = this.props;

    return articleData.sources.map((field, index) =>
      <ArticleSourceTranslateItem field={ field } index={ index } key={ index }/>);
  };

  render() {
    const { articleData } = this.props;
    return (
      <div  className="article-common-translate-form">
        <h2 className="page__title">Список литературы</h2>

        { articleData.sources.length > 0 &&
          <div className="form__field">
            <div className="article-source-list">
              { this.renderSourceList() }
            </div>
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

export default connect(
  mapStateToProps,
)(ArticleSourcesTranslateForm);
