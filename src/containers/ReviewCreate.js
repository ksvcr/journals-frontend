import React, { Component } from 'react'
import { connect } from 'react-redux';

import ReviewCreateForm from '~/components/ReviewCreateForm/ReviewCreateForm';

import * as articlesActions from '~/store/articles/actions';

class ReviewCreate extends Component {
  componentDidMount() {
    this.handleInitialRequest();
  }

  handleInitialRequest = () => {
    const { articleId, fetchArticle } = this.props;

    return Promise.all([
      fetchArticle(articleId)
    ]);
  };

  render() {
    const { articleId } = this.props;
    return (
      <React.Fragment>
        <h1 className="page__title">
          Новая рецензия
        </h1>

        <ReviewCreateForm id={ articleId } />
      </React.Fragment>
    )
  }
}

function mapStateToProps(state, props) {
  const { match } = props;
  let { articleId } = match.params;
  articleId = articleId ? parseInt(articleId, 10) : articleId;
  return {
    articleId
  };
}

const mapDispatchToProps = {
  fetchArticle: articlesActions.fetchArticle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewCreate);
