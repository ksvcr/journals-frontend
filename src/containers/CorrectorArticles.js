import React, { Component } from 'react';
import { connect } from 'react-redux';

import CorrectorArticleList from '~/components/CorrectorArticleList/CorrectorArticleList';
import SearchPanel from '~/components/SearchPanel/SearchPanel';
import Select from '~/components/Select/Select';

import * as articlesActions from '~/store/articles/actions';
import { getArticlesParams } from '~/store/articles/selector';

class CorrectorArticles extends Component {
  componentDidMount() {
    this.handleRequest();
  }

  handleRequest = (params={}) => {
    const { siteId, articlesParams, fetchArticles } = this.props;
    const fetchArticlesParams = {
      ...articlesParams,
      ...params,
      state_article: 'AWAIT_PROOFREADING'
    };

    return fetchArticles(siteId, fetchArticlesParams);
  };

  get searchTargets() {
    return [
      {
        value: 'title',
        title: 'Искать в заголовках'
      },
      {
        value: 'author',
        title: 'Искать в авторах'
      },
      {
        value: 'doi',
        title: 'Номер'
      }
    ];
  }

  get selectTagsProps() {
    // TODO: Добавить список тегов
    return {
      name: 'tags',
      options: [],
      onChange: (event) => {}
    };
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="page__title">Мои статьи</h1>

        <div className="page__tools">
          <div className="form">
            <div className="form__field">
              <label className="form__label">Поиск статьи</label>
              <SearchPanel targets={ this.searchTargets } onChange={ this.handleRequest } />
            </div>
            <div className="form__row">
              <div className="form__col form__col_6">
                <div className="form__field">
                  <label className="form__label">Теги</label>
                  <Select { ...this.selectTagsProps } />
                </div>
              </div>
            </div>
          </div>
        </div>

        <CorrectorArticleList onUpdateRequest={ this.handleRequest } />
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
)(CorrectorArticles);
