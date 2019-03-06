import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import RedactorArticleList from '~/components/RedactorArticleList/RedactorArticleList';

import * as usersActions from '~/store/users/actions';
import * as articlesActions from '~/store/articles/actions';
import apiClient from '~/services/apiClient';

import { getArticlesParams } from '~/store/articles/selector';

import SearchPanel from '~/components/SearchPanel/SearchPanel';
import SearchableSelect from '~/components/SearchableSelect/SearchableSelect';

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

  get searchTargets() {
    const { t } = this.props;
    return [
      {
        value: 'title',
        title: t('search_in_titles')
      },
      {
        value: 'author',
        title: t('search_in_authors')
      },
      {
        value: 'doi',
        title: t('number')
      }
    ];
  }

  loadOptions = inputValue => {
    return new Promise(resolve => {
      if (!inputValue) resolve([]);
      apiClient.getArticleTags({ search_query: inputValue }).then(data => {
        const options = data.results.map(item => ({ label: item.text, value: item.id }));
        resolve(options);
      });
    });
  };

  get selectTagsProps() {
    return {
      async: true,
      name: 'tags',
      loadOptions: this.loadOptions,
      placeholder: 'Выберите тег',
      normalize: option => option.value,
      onChange: tag => {
        this.handleRequest({ filter: { tag_ids: tag } });
      }
    };
  }

  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <h1 className="page__title">
          { t('my_articles') }
        </h1>
        <div className="page__tools">
          <div className="form__field">
            <label className="form__label">
              { t('article_search') }
            </label>
            <SearchPanel targets={ this.searchTargets } onChange={ this.handleRequest } />
          </div>
          <div className="form__row">
            <div className="form__col form__col_6">
              <div className="form__field">
                <label className="form__label">
                  { t('tags') }
                </label>
                <SearchableSelect { ...this.selectTagsProps } />
              </div>
            </div>
          </div>
        </div>
        <RedactorArticleList onUpdateRequest={ this.handleRequest } />
      </React.Fragment>
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

RedactorArticles = withNamespaces()(RedactorArticles);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedactorArticles);
