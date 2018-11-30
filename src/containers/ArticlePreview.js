import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { getFormValues } from 'redux-form';

import Menu from '~/components/Menu/Menu';
import Content from '~/components/Content/Content';

import * as articlesActions from '~/store/articles/actions';

class ArticlePreview extends Component {
  componentDidMount() {
    this.handleRequest();
  }

  handleRequest = (params={}) => {
    const { fetchArticles } = this.props;
    return fetchArticles({ ...params });
  };

  componentDidUpdate() {
    const { isFulfilled, articleData, push } = this.props;
    if (isFulfilled && !articleData) {
      push('/');
    }
  }

  get menuItems() {
    return [
      {
        title: 'Мои статьи',
        href: '/'
      },
      {
        title: 'Мои скидки',
        href: '/second'
      },
      {
        title: 'Настройки',
        href: '/'
      }
    ];
  }

  render() {
    const { isFulfilled, articleData } = this.props;
    return isFulfilled && (
      <React.Fragment>
        <aside className="page__sidebar">
          <Menu items={ this.menuItems } />
        </aside>

        <article className="page__content">
          <h1 className="page__title">Просмотр</h1>
          { articleData.blocks &&
            <Content blocks={ articleData.blocks } />
          }
        </article>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  const formValues = getFormValues('article-publish')(state);
  const { match } = props;
  const { articles } = state;
  let { articleId } = match.params;

  let articleData;

  if (articleId === 'new') {
    articleData = formValues;
  } else {
    articleData = articles.data[articleId]
  }
  console.log(articleData);
  return {
    isFulfilled: articles.isFulfilled,
    articleData
  };
}

const mapDispatchToProps = {
  push,
  fetchArticles: articlesActions.fetchArticles
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePreview);
