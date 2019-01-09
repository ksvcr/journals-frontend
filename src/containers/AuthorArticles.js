import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from '~/components/Menu/Menu';
import AuthorArticleList from '~/components/AuthorArticleList/AuthorArticleList';
import SiteSelect from '~/components/SiteSelect/SiteSelect';
import SearchPanel from '~/components/SearchPanel/SearchPanel';

import * as articlesActions from '~/store/articles/actions';
import { getArticlesParams } from '~/store/articles/selector';


class AuthorArticles extends Component {
  componentDidMount() {
    this.handleRequest();
  }

  handleRequest = (params={}) => {
    const { siteId, articlesParams, fetchArticles } = this.props;
    return fetchArticles(siteId, { ...articlesParams, ...params });
  };

  get searchTargets() {
    return [
      {
        value: 'title',
        title: 'Искать в заголовках'
      }
    ];
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
    return (
      <React.Fragment>
        <aside className="page__sidebar">
          <Menu items={ this.menuItems } />
        </aside>

        <article className="page__content">
          <h1 className="page__title">Мои статьи</h1>

          <div className="page__tools">
            <form className="form">
              <div className="form__field">
                <label htmlFor="sites-list" className="form__label">Для журнала</label>
                <SiteSelect id="sites-list" onChange={ this.handleRequest } />
              </div>
              <div className="form__field">
                <label className="form__label">Поиск статьи</label>
                <SearchPanel targets={ this.searchTargets } onChange={ this.handleRequest } />
              </div>
            </form>
          </div>

          <AuthorArticleList onUpdateRequest={ this.handleRequest } />
        </article>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { sites } = state;
  return {
    siteId: sites.current,
    articlesParams: getArticlesParams(state)
  };
}

const mapDispatchToProps = {
  fetchArticles: articlesActions.fetchArticles
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorArticles);
