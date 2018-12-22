import React, { Component } from 'react';
import { connect } from 'react-redux';

import RedactorArticleList from '~/components/RedactorArticleList/RedactorArticleList';

import * as usersActions from '~/store/users/actions';
import * as articlesActions from '~/store/articles/actions';
import { getArticlesParams } from '~/store/articles/selector';

class RedactorArticles extends Component {
  componentDidMount() {
    this.handleInitialRequest();
  }

  handleInitialRequest = () => {
    const { fetchUsers } = this.props;
    return Promise.all([
      fetchUsers({ role: 'REVIEWER' }),
      this.handleRequest()
    ]);
  };

  handleRequest = (params={}) => {
    const { articlesParams, fetchArticles } = this.props;
    return fetchArticles(null, { ...articlesParams, ...params });
  };

  render() {
    return (
      <article className="page__content">
        <h1 className="page__title">Мои статьи</h1>
        <RedactorArticleList onUpdateRequest={ this.handleRequest } />
      </article>
    );
  }
}

function mapStateToProps(state) {
  return {
    articlesParams: getArticlesParams(state)
  };
}

const mapDispatchToProps = {
  fetchUsers: usersActions.fetchUsers,
  fetchArticles: articlesActions.fetchArticles
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedactorArticles);
